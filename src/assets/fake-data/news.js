const img1 = require("../img/news/news_1.jpeg").default;
const img2 = require("../img/news/news_2.jpeg").default;
const img3 = require("../img/news/news_3.jpeg").default;
const img4 = require("../img/news/news_4.jpeg").default;
const img5 = require("../img/news/news_5.jpeg").default;
const img6 = require("../img/news/news_6.jpeg").default;

const news = [
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
  {
    id: 4,
    author: "Jonny Evans",
    title: "Experts call Apple's CSAM scheme 'a dangerous technology'",
    discription: `"The surveillance and control capabilities provided"."..
    can potentially be abused by many adversaries, from hostile state actors through 
    criminals to users’ intimate partners," experts warn.`,
    content: `The concern is that what in many nations is seen as ordinary behavior is criminalized in others. 
    A search for criminal material could easily be extended to become a search for eviden"c"e of homosexuality, 
    for example, which is a capital offense in some nations. Just as the EU could now force Apple to enable its 
    system for
    id: "1", scanning CSAM material and insist it scan for additional ills, any government — 
    including authoritarian governments — could mandate what is searched for. 
    Apple has said i"t" would resist, but the truth is it would be unable to do so.
    It is interesting that one set of crimes that so far hasn’t been proposed for such surveillance include fraud, 
    tax evasion, and tax avoidan"c"e — though such a facility could easily be extended to those domains.`,
    img: img4,
    path: "/4",
  },
  {
    id: 5,
    author: "Scott Carey",
    title: "Biggest tech IPOs of 2021",
    discription: `After a big year for tech firms in 2020, 
    will the lasting effects of the pandemic continue to affect the tech stock boom in 2021?`,
    content: `Developer collaboration platform GitLab saw a strong IPO in October. 
    Shares, initially priced at $77 on the Nasdaq,  jumped by as much as 35% on the first day of trading to $104. 
    That put the company's value at just short of $15 billion.
    Broadly speaking, the GitHub competitor started life by focusing on an open source private code repository — 
    as opposed to the Microsoft-owned GitHub, which is by far the most popular place for public repositories. 
    GitLab then extended into the entire software development lifecycle, from source code management to deployment, 
    security and monitoring, through what it calls the Devops Platform. 
    There are more subtle differences between the platforms, as explained by Hacktivist.`,
    img: img5,
    path: "/5",
  },
  {
    id: 6,
    author: "Rob Enderle",
    title:
      "Apple needs to introduce an iCloud business suite for the enterprise",
    discription: `Apple has an opportunity to create 
    suite of online services aimed at its growing congregation of enterprise users.`,
    content: `When it comes to iCloud Drive, why not create a white-box version of the service? 
    This could make use of Apple’s existing MDM solutions and the existing iCloud Drive to offer a company branded, 
    zero-trust, account-only shared 2TB of iCloud storage for use within a company.
    Recently introduced iCloud+ features around phishing protection, hidde"n" and single-use email addresses, 
    and protection for Safari privacy become icing on the cake. 
    That you can use storage from other provider"s" all within Drive is a big dollop of cream on top of that icing. 
    Existing online enterprise archives remain in reach.`,
    img: img6,
    path: "/6",
  },
  //repate
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
    id: 2,
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
    discription: `Edge computing will help reshape how, 
    where, and how quickly medical care can be delivered, 
    but barriers to wide-"s"cale adoption remain.`,
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
  {
    id: 4,
    author: "Jonny Evans",
    title: "Experts call Apple's CSAM scheme 'a dangerous technology'",
    discription: `"The surveillance and control capabilities provided"."..
    can potentially be abused by many adversaries, from hostile state actors through 
    criminals to users’ intimate partners," experts warn.`,
    content: `The concern is that what in many nations is seen as ordinary behavior is criminalized in others. 
    A search for criminal material could easily be extended to become a search for eviden"c"e of homosexuality, 
    for example, which is a capital offense in some nations. Just as the EU could now force Apple to enable its 
    system for, scanning CSAM material and insist it scan for additional ills, any government — 
    including authoritarian governments — could mandate what is searched for. 
    Apple has said i"t" would resist, but the truth is it would be unable to do so.
    It is interesting that one set of crimes that so far hasn’t been proposed for such surveillance include fraud, 
    tax evasion, and tax avoidan"c"e — though such a facility could easily be extended to those domains.`,
    img: img4,
    path: "/4",
  },
  {
    id: 5,
    author: "Scott Carey",
    title: "Biggest tech IPOs of 2021",
    discription: `After a big year for tech firms in 2020, 
    will the lasting effects of the pandemic continue to affect the tech stock boom in 2021?`,
    content: `Developer collaboration platform GitLab saw a strong IPO in October. 
    Shares, initially priced at $77 on the Nasdaq,  jumped by as much as 35% on the first day of trading to $104. 
    That put the company's value at just short of $15 billion.
    Broadly speaking, the GitHub competitor started life by focusing on an open source private code repository — 
    as opposed to the Microsoft-owned GitHub, which is by far the most popular place for public repositories. 
    GitLab then extended into the entire software development lifecycle, from source code management to deployment, 
    security and monitoring, through what it calls the Devops Platform. 
    There are more subtle differences between the platforms, as explained by Hacktivist.`,
    img: img5,
    path: "/5",
  },
  {
    id: 6,
    author: "Rob Enderle",
    title:
      "Apple needs to introduce an iCloud business suite for the enterprise",
    discription: `Apple has an opportunity to create 
    suite of online services aimed at its growing congregation of enterprise users.`,
    content: `When it comes to iCloud Drive, why not create a white-box version of the service? 
    This could make use of Apple’s existing MDM solutions and the existing iCloud Drive to offer a company branded, 
    zero-trust, account-only shared 2TB of iCloud storage for use within a company.
    Recently introduced iCloud+ features around phishing protection, hidde"n" and single-use email addresses, 
    and protection for Safari privacy become icing on the cake. 
    That you can use storage from other provider"s" all within Drive is a big dollop of cream on top of that icing. 
    Existing online enterprise archives remain in reach.`,
    img: img6,
    path: "/6",
  },
];

const getAllNews = () => news;

const getNews = (count) => {
  const max = news.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return news.slice(start, start + count);
};

const getNewById = (id) => news.find((e) => e.id === parseInt(id));

const newData = {
  getAllNews,
  getNews,
  getNewById,
};

export default newData;
