from pathlib import Path
import hashlib,json,shutil,re,zipfile
src=Path('/private/tmp/anx0133-source-v1.2.1/dist');prod=Path('/private/tmp/anx0133-page-20261026');out=Path('/private/tmp/anx0133-v1.2.1-artifact');receipts=Path('/private/tmp/anx0133-v1.2.1-validation')
assert not out.exists();out.mkdir()
for p in src.rglob('*'):
 if not p.is_file() or '.vite' in p.relative_to(src).parts:continue
 target=out/p.relative_to(src);target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,target)
retained=[]
for p in (prod/'assets').rglob('*'):
 if not p.is_file():continue
 target=out/p.relative_to(prod)
 if target.exists():assert target.read_bytes()==p.read_bytes(),str(p)
 else:target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,target);retained.append(p.relative_to(prod).as_posix())
shutil.copy2(prod/'CNAME',out/'CNAME');(out/'.nojekyll').write_bytes(b'')
if not (out/'.htaccess').exists() and (prod/'.htaccess').exists():shutil.copy2(prod/'.htaccess',out/'.htaccess')
for p in out.rglob('*'):
 if not p.is_file():continue
 path=p.relative_to(out)
 assert not any(x in path.parts for x in ['.git','.vite','.agents','.codex','node_modules','src','docs']),str(path)
 assert not p.name.startswith('.env') and p.suffix not in ['.map','.pem','.key','.jsx','.tsx'],str(path)
files={p.relative_to(out).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in out.rglob('*') if p.is_file()}
digest=hashlib.sha256(json.dumps(files,sort_keys=True,separators=(',',':')).encode()).hexdigest()
entry=re.search(r'<script[^>]+src="([^"]+)"',(out/'index.html').read_text())[1];assert entry.startswith('/assets/') and (out/entry.lstrip('/')).exists()
marker={'version':'v1.2.1','sourceRepository':'Zuriel0/communications-electronics-portfolio','sourceCommit':'a2a6b1e725ccfc9c6c08ddf6ee7882be2703ac58','sourceTag':'v1.2.1','entry':entry,'artifactSHA256':digest,'artifactHashMethod':'SHA-256 of sorted compact JSON path-to-SHA256 map, excluding deployment.json'}
(out/'deployment.json').write_text(json.dumps(marker,indent=2)+'\n');files['deployment.json']=hashlib.sha256((out/'deployment.json').read_bytes()).hexdigest()
old={p.relative_to(prod).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in prod.rglob('*') if p.is_file() and '.git' not in p.relative_to(prod).parts}
diff={'beforeCommit':'bd41427bdac1d7572120b54414b5171ea0a95129','added':sorted(files.keys()-old.keys()),'modified':sorted(k for k in files.keys()&old.keys() if files[k]!=old[k]),'removed':sorted(old.keys()-files.keys()),'retainedPreviousHashedAssets':sorted(retained),'cnameBytesPreserved':(prod/'CNAME').read_bytes()==(out/'CNAME').read_bytes(),'nojekyll':(out/'.nojekyll').read_bytes()==b''}
assert not diff['removed'];assert diff['cnameBytesPreserved']
for route in ['','concurrencia','metodologia','nodalume']:
 file='index.html' if not route else f'projects/{route}/index.html';assert file in files
 html=(out/file).read_text();assert html.count('<title>')==1 and html.count('rel="canonical"')==1
 for path in re.findall(r'(?:src|href)="(/assets/[^"]+)"',html):assert path.lstrip('/') in files,path
 assert 'https://anxzu.com' in html
assert (out/'sitemap.xml').read_text().count('<loc>')==4
manifest={'version':'v1.2.1','sourceTag':'v1.2.1','sourceCommit':marker['sourceCommit'],'artifactSHA256':digest,'fileCount':len(files),'files':dict(sorted(files.items()))}
(receipts/'artifact-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');(receipts/'deployment-diff.json').write_text(json.dumps(diff,indent=2)+'\n');(receipts/'deployment-marker.json').write_text(json.dumps(marker,indent=2)+'\n')
with zipfile.ZipFile(receipts/'anxzu-v1.2.1-pages.zip','w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for file in sorted(files):z.write(out/file,file)
print(json.dumps({'files':len(files),'entry':entry,'digest':digest,'retainedPreviousAssets':len(retained),'diff':diff},indent=2))
