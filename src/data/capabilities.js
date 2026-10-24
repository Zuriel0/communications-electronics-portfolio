// Context is evidence, not a proficiency score. ANX-012 owner brief confirms the new labs/projects.
export const evidenceContexts = {
  professional: 'Professional Experience', project: 'Personal Projects',
  lab: 'Hands-On Labs', credential: 'Verified Credentials', learning: 'In Progress Learning',
};
export const capabilityAreas = [
  { id:'networking', title:'Networking & Telecommunications',
    summary:'Designing, integrating and troubleshooting enterprise connectivity, access and authentication.',
    groups:[
      { context:'professional', items:['Enterprise LAN/WAN','Routing and Switching','VLAN and Network Segmentation','BGP and Routing Fundamentals','Enterprise Wi-Fi','RADIUS / AAA','Captive Portals','Network Troubleshooting','Network Security','Fortinet','Cisco','Aruba','Ruckus','Huawei'], note:'Fortinet: captive-portal implementation. Cisco: basic captive portals, VLANs, static and dynamic routing. Aruba, Ruckus and Huawei: Wi-Fi administration.' },
      { context:'credential', items:['Extreme Networks'], note:'Public issuer records document networking and solution-design training.' },
      { context:'project', items:['MikroTik'], note:'Nodalume integrates MikroTik in a self-hosted captive-portal laboratory.' },
    ], link:{href:'/projects/concurrencia',label:'Explore the SSH monitoring case'} },
  { id:'cloud', title:'AWS & Cloud Architecture',
    summary:'Hands-on network and access-control labs in us-east-1: a 10.20.0.0/16 VPC, public/private subnets, EC2, IAM, S3 and an S3 Gateway Endpoint.',
    groups:[{context:'lab', items:['Amazon VPC','Public and Private Subnets','Amazon EC2','IAM Roles and Policies','Amazon S3','Internet Gateway','NAT Gateway','VPC Gateway Endpoints for S3','Route Tables','Security Groups','Network ACLs','Private Cloud Networking','Basic Cloud Security and Least Privilege'],note:'Laboratory practice; no AWS production deployment is claimed.'}],
    link:{href:'#learning-in-progress',label:'View certification preparation'} },
  { id:'backend', title:'Backend Engineering & Databases',
    summary:'Nodalume is a self-hosted captive-portal software project with a React console, backend services and RADIUS integration.',
    groups:[{context:'project',items:['Node.js','Express','REST APIs','PostgreSQL','SQL','Session Management','Multi-Tenant Application Design','Backend Service Integration']},
      {context:'lab',items:['FreeRADIUS','RADIUS Authentication and Accounting','Docker Compose','Linux Services'],note:'Nodalume lab work has validated authentication, authorization, session policies and RADIUS accounting. No commercial production or customer adoption is claimed.'}] },
  { id:'infrastructure', title:'Infrastructure, Linux & Virtualization',
    summary:'Deploying Linux and network services, configuring virtual networks and diagnosing connectivity in Debian-based test environments.',
    groups:[{context:'professional',items:['Debian Linux','Linux Administration','Networking Services Deployment']},
      {context:'lab',items:['Docker','Docker Compose','VMware Workstation','Microsoft Hyper-V','UTM Virtualization','Virtual Network Configuration','Virtual Appliances','Troubleshooting of VM Connectivity'],note:'Debian virtual machines, test controllers and network services. Scope is not extended to ESXi, vSphere or Kubernetes.'}] },
  { id:'software', title:'Software Development & AI-Assisted Engineering',
    summary:'From interface prototypes to integrated services: implementation, documentation, review and testing across ANXZU, Nodalume and the customization methodology.',
    groups:[{context:'professional',items:['React','Automation','Technical Documentation']},
      {context:'project',items:['JavaScript','Node.js','Git / GitHub','Frontend Development','Backend Development','AI-Assisted Coding','Prompt Engineering for Technical Workflows','Agent-Assisted Development','Code Review and Validation','UI/UX Prototyping','Software Testing'],note:'AI assists engineering workflows; human review and validation remain explicit responsibilities.'}],
    link:{href:'/projects/metodologia',label:'Explore the customization methodology'} },
  { id:'presales', title:'Solutions Architecture & Technical Presales',
    summary:'Connecting requirements, technical feasibility and implementation scope in telecommunications and B2B solution design.',
    groups:[{context:'professional',items:['Requirements Gathering','RFP Analysis','Technical Compliance Matrices','Solution Sizing','Network Architecture','Technical Proposals','SOW','Site Surveys','Vendor Evaluation','Technical Demonstrations','Network Diagrams','B2B Solution Design']}] },
];
