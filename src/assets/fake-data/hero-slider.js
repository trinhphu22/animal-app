const img1 = require("../img/slider/news_1.jpeg").default;
const img2 = require("../img/slider/news_2.jpeg").default;
const img3 = require("../img/slider/news_3.jpeg").default;

const heroSliderData = [
  {
    id: 1,
    author: "Greg Lambert",
    title: "Four zero-day exploits add urgency to October's Patch Tuesday",
    discription: `Microsoft's update for this month brings 
    fixes for four zero-day vulnerabilities and 74 updates to the Windows ecosystem —
    including a difficult-to-test kernel update and an Exchange Server update that requires
    some technical skill and due diligence.`,
    content: `October brings four zero-day exploits and 74 updates to the Windows ecosystem, 
    including a hard-to-test kernel update (CVE-2021-40449) that requires immediate attention and 
    an Exchange Server update that requires technical skill and due diligence (and a reboot). 
    The testing profile for the October Patch Tuesday covers Windows error handling, 
    AppX, Hyper-V and Microsoft Word. We recommend a Patch Now schedule for 
    Windows and then staging the remaining patch groups according to your normal release pattern.
    You can find more information on the risk of deploying these Patch Tuesday updatesin this infographic.`,
    img: img1,
    path: "/1",
  },
  {
    id: "2",
    author: "Bob Violino",
    title: "How to choose the right UEM platform",
    discription: `Unified Endpoint Management software lets IT manage all of an 
    organization’s endpoint devices — smartphones, laptops, desktops, printers, 
    IoT devices, and more — from a single management console. 
    Here’s what to look for when shopping for a platform.`,
    content: `Endpoint devices have become so ubiquitous, connected, 
    and data-intensive that they are among the most valuable technology assets an organization has today. 
    They’re also some of the biggest security risks. 
    It’s no surprise, then, that managing the large and growing number of smartphones, laptops, tablets, 
    desktops, and other end-user products is a high priority for IT.
    For a growing number of enterprises, unified endpoint management (UEM) is the method of choice for 
    keeping management of endpoints from descending into chaos. UEM platforms are designed to simplify 
    the management of devices and enhance the security of heterogeneous environments.
    Among the key selling points of UEM is that it’s preferable to using a multitude of disparate 
    mobility management tools that can end up increasing costs and decreasing efficiency for companies.`,
    img: img2,
    path: "/2",
  },
  {
    id: 3,
    author: "Mary K. Pratt",
    title:
      "The cutting edge of healthcare: How edge computing will transform medicine",
    discription: `Edge computing will help reshape how, where, and how quickly medical care can be delivered, 
    but barriers to wide-scale adoption remain.`,
    content: `Children’s Health of Orange County, a California-based pediatric healthcare system, 
    is working with other medical institutions to gather clinical images — MRIs, echocardiograms, and the like. 
    The goal: to create a repository of images to analyze for insights that could train algorithms capable of 
    aidin"g" clinicians with diagnoses. Although the initiative is in its early stages, CHOC vice presiden"t" and 
    CIO John Henderson is already thinking about the technologies his organization would need to 
    enable such an intelligent system. Edge computing, with its ability to deliver real-time analysis of large files, 
    would be a key component to making that work, he says.`,
    img: img3,
    path: "/3",
  },
];

export default heroSliderData;
