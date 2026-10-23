import subprocess,time,json,tempfile,statistics,os,signal
from pathlib import Path
chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
def seconds(value):return sum(float(v)*60**i for i,v in enumerate(reversed(value.split(':'))))
def snapshot(parent):
 tree={}
 for line in subprocess.check_output(['ps','-axo','pid=,ppid=,time='],text=True).splitlines():
  pid,ppid,clock=line.split();tree[int(pid)]=(int(ppid),seconds(clock))
 owned={parent}
 while True:
  children={pid for pid,(ppid,_) in tree.items() if ppid in owned}
  if children<=owned:break
  owned|=children
 return {pid:tree[pid][1] for pid in owned if pid in tree}
scenarios=[('all-static','loadbalance',True),('balance-active','loadbalance',False),('business-active','business',False)]
results=[]
cleanupWarnings=[]
for repeat in range(1,4):
 for name,diagram,reduced in scenarios:
  profile=tempfile.mkdtemp(prefix='anx008-cpu-',dir='/tmp')
  url=f'http://127.0.0.1:4173/projects/concurrencia#diagram-{diagram}'
  flags=['--headless=new','--no-first-run','--disable-background-networking',f'--user-data-dir={profile}','--window-size=1440,1000']
  if reduced:flags.append('--force-prefers-reduced-motion')
  process=subprocess.Popen([chrome,*flags,url],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,start_new_session=True)
  try:
   time.sleep(3)
   before=snapshot(process.pid);start=time.monotonic();samples=[]
   for _ in range(8):
    time.sleep(1)
    after=snapshot(process.pid);now=time.monotonic();delta=sum(max(0,v-before.get(pid,0)) for pid,v in after.items())
    samples.append({'wallSeconds':now-start,'cpuSeconds':delta,'oneCorePercent':100*delta/(now-start),'processes':len(after)})
    before=after;start=now
   row={'scenario':name,'repeat':repeat,'url':url,'reducedMotion':reduced,'samples':samples,'wallSeconds':sum(s['wallSeconds'] for s in samples),'cpuSeconds':sum(s['cpuSeconds'] for s in samples)}
   row['oneCorePercent']=100*row['cpuSeconds']/row['wallSeconds'];results.append(row)
   print(name,repeat,round(row['oneCorePercent'],2),flush=True)
  finally:
   process.terminate()
   try:process.wait(timeout=3)
   except subprocess.TimeoutExpired:process.kill();process.wait()
   try:os.killpg(process.pid,signal.SIGTERM)
   except ProcessLookupError:pass
   except PermissionError as error:cleanupWarnings.append({"scenario":name,"repeat":repeat,"message":str(error),"note":"Chrome parent terminated; OS refused a remaining process-group signal. No unrelated process was targeted."})
report={'cleanupWarnings':cleanupWarnings,'method':'Approximate aggregate CPU of fresh Chrome headless process trees from ps. 3s warmup, eight ~1s samples, three alternating repeats per scenario; 1440x1000, no input. 100% equals one core. All-static uses browser reduced-motion flag, not a claim that manual pause was clicked in this process. Manual pause was separately checked in the controlled browser. Four Concurrencia diagrams mounted; only named diagram visible in active scenarios. No GPU/energy/FPS inference.','results':results,'summary':{name:{'medianOneCorePercent':statistics.median(r['oneCorePercent'] for r in results if r['scenario']==name),'min':min(r['oneCorePercent'] for r in results if r['scenario']==name),'max':max(r['oneCorePercent'] for r in results if r['scenario']==name)} for name,_,_ in scenarios}}
Path('docs/redesign/reports/anx-008-cpu.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report['summary']),flush=True)
