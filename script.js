document.body.classList.add("loading");
window.addEventListener("load",()=>{setTimeout(()=>{document.querySelector(".page-loader")?.classList.add("done");document.body.classList.remove("loading");},850);});

const progress=document.querySelector(".scroll-progress");
const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+"%";};
window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();

const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});},{threshold:.13,rootMargin:"0px 0px -35px 0px"});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuButton?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close navigation":"Open navigation");});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");}));

const countObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);let start=0;const duration=1100;const begin=performance.now();const tick=now=>{const p=Math.min((now-begin)/duration,1);const eased=1-Math.pow(1-p,4);el.textContent=Math.round(start+(target-start)*eased)+"+";if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);observer.unobserve(el);});},{threshold:.7});
document.querySelectorAll("[data-count]").forEach(el=>countObserver.observe(el));

if(matchMedia("(pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const glow=document.querySelector(".ambient-glow");let raf=0;
 window.addEventListener("pointermove",e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";});},{passive:true});
 document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.08;const y=(e.clientY-r.top-r.height/2)*.12;el.style.transform=`translate(${x}px,${y}px)`;});el.addEventListener("pointerleave",()=>el.style.transform="");});
}
document.querySelector("#year").textContent=new Date().getFullYear();