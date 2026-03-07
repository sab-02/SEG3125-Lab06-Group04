const steps=document.querySelectorAll(".form-step")
const nextBtns=document.querySelectorAll(".next-btn")
const prevBtns=document.querySelectorAll(".prev-btn")
const progress=document.getElementById("progressBar")

let currentStep=0

function showStep(step){

steps.forEach((s,i)=>{
s.classList.remove("active-step")
if(i===step)s.classList.add("active-step")
})

progress.style.width=((step+1)/steps.length*100)+"%"
}

nextBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
currentStep++
showStep(currentStep)
})
})

prevBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
currentStep--
showStep(currentStep)
})
})
