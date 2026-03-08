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

document.getElementById("submitButton").addEventListener("click", async () => {

const appealing = document.querySelector('input[name="appealing"]:checked')?.value || "";

const features = Array.from(
document.querySelectorAll('input[type="checkbox"]:checked')
).map(cb => cb.value);

const data = {
most_used: document.getElementById("most_used").value,
ui_change: document.getElementById("ui_change").value,
appealing: appealing,
time: document.getElementById("time").value,
features: features,
feedback: document.querySelector("textarea").value
};

try {

const response = await fetch("/api/survey", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
});

const result = await response.json();

alert("Survey submitted successfully!");

} catch (error) {
console.error(error);
alert("Error submitting survey");
}

});