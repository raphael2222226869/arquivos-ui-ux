const pets = [
 {id:1,name:"Mimi",type:"Gato",age:"1 ano",ageGroup:"Adulto",size:"Pequeno",sex:"Fêmea",neutered:"Consultar",description:"Mimi é uma gatinha carinhosa e curiosa. Gosta de ambientes tranquilos, carinho e brincadeiras. Procura uma família que possa oferecer segurança e cuidado."},
 {id:2,name:"Rex",type:"Cachorro",age:"3 anos",ageGroup:"Adulto",size:"Grande",sex:"Macho",neutered:"Consultar",description:"Rex é um cachorro companheiro e cheio de energia. Precisa de espaço para brincar, passeios e uma família disposta a compartilhar muitos momentos felizes."},
 {id:3,name:"Luna",type:"Cachorro",age:"6 meses",ageGroup:"Filhote",size:"Médio",sex:"Fêmea",neutered:"Não informado",description:"Luna é uma filhote brincalhona que está descobrindo o mundo. Precisa de uma família paciente para acompanhar seu crescimento."},
 {id:4,name:"Thor",type:"Cachorro",age:"5 anos",ageGroup:"Adulto",size:"Grande",sex:"Macho",neutered:"Consultar",description:"Thor é tranquilo e leal. Procura um lar responsável, com carinho, alimentação adequada e acompanhamento veterinário."},
 {id:5,name:"Mel",type:"Gato",age:"2 anos",ageGroup:"Adulto",size:"Pequeno",sex:"Fêmea",neutered:"Consultar",description:"Mel é uma gatinha doce e independente. Gosta de descansar em lugares aconchegantes e receber atenção no seu tempo."},
 {id:6,name:"Bob",type:"Cachorro",age:"4 meses",ageGroup:"Filhote",size:"Pequeno",sex:"Macho",neutered:"Não informado",description:"Bob é um filhote alegre e curioso. Como todo filhote, precisa de rotina, socialização, vacinação e muito carinho."},
 {id:7,name:"Nina",type:"Gato",age:"8 anos",ageGroup:"Idoso",size:"Pequeno",sex:"Fêmea",neutered:"Consultar",description:"Nina é uma gatinha mais experiente, que merece um lar tranquilo e acolhedor para aproveitar muitos anos de companhia."},
 {id:8,name:"Bidu",type:"Cachorro",age:"2 anos",ageGroup:"Adulto",size:"Médio",sex:"Macho",neutered:"Consultar",description:"Bidu é sociável e gosta de companhia. Procura uma família que possa cuidar dele com responsabilidade."},
 {id:9,name:"Amora",type:"Gato",age:"1 ano",ageGroup:"Adulto",size:"Pequeno",sex:"Fêmea",neutered:"Consultar",description:"Amora é delicada e curiosa. Um lar seguro e cheio de carinho é tudo o que ela precisa."}
];
function petCard(p){return `<article class="pet-card"><div class="pet-image"><span>🐾</span></div><h3>${p.name}</h3><p>${p.type} - ${p.age}</p><a class="btn pink" href="detalhes.html?id=${p.id}">QUERO ADOTAR</a></article>`}
const featured=document.getElementById("featuredPets");
if(featured) featured.innerHTML=pets.slice(0,4).map(petCard).join("");
const allPets=document.getElementById("allPets");
function filterPets(){
 if(!allPets)return;
 const q=(document.getElementById("searchName").value||"").toLocaleLowerCase("pt-BR");
 const type=document.getElementById("filterType").value, age=document.getElementById("filterAge").value, size=document.getElementById("filterSize").value;
 const found=pets.filter(p=>p.name.toLocaleLowerCase("pt-BR").includes(q)&&(!type||p.type===type)&&(!age||p.ageGroup===age)&&(!size||p.size===size));
 allPets.innerHTML=found.length?found.map(petCard).join(""):'<div class="empty-state">Nenhum animal encontrado. Tente mudar os filtros. 🐾</div>';
 document.getElementById("resultsCount").textContent=`${found.length} animal(is) encontrado(s)`;
}
if(allPets){["searchName","filterType","filterAge","filterSize"].forEach(id=>document.getElementById(id).addEventListener(id==="searchName"?"input":"change",filterPets));filterPets();}
const detailName=document.getElementById("petName");
if(detailName){
 const id=Number(new URLSearchParams(location.search).get("id"))||1;
 const p=pets.find(x=>x.id===id)||pets[0];
 document.title=`ADOÇÃO LINS | ${p.name}`;
 detailName.textContent=p.name;document.getElementById("aboutTitle").textContent=`Sobre ${p.name}`;
 document.getElementById("petSex").textContent=(p.sex==="Macho"?"♂ ":"♀ ")+p.sex;
 document.getElementById("petAge").textContent="▣ "+p.age;document.getElementById("petSize").textContent="🐾 "+p.size;
 document.getElementById("petDescription").textContent=p.description;
 document.getElementById("factSize").textContent=p.size;document.getElementById("factAge").textContent=p.age;
 document.getElementById("factSex").textContent=p.sex;document.getElementById("factNeutered").textContent=p.neutered;
 document.getElementById("shareBtn").addEventListener("click",async()=>{const url=location.href;try{if(navigator.share)await navigator.share({title:`Adote ${p.name}`,url});else{await navigator.clipboard.writeText(url);alert("Link copiado para compartilhar!");}}catch(e){}});
}
const contactForm=document.getElementById("contactForm");
if(contactForm)contactForm.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="Mensagem preparada! Configure um serviço de envio para receber os contatos da ONG.";contactForm.reset();});
