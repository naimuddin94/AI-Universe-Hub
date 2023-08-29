const getData = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const tools = data.data.tools;
  displayData(tools);
};

const displayData = (arr) => {
  const display = document.getElementById("display");
  // const defaultPhoto = "./images/Jasperchat.png";

  arr.forEach((element) => {
    const allFeature = element?.features?.map((feature) => {
      return `<li>${feature}</li>`;
    });
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const img = document.createElement("img");
    img.className = "border border-rose-100 rounded-md";
    const imageUrl =
      element.image ==
      "https://www.proremodeler.com/sites/proremodeler/files/Jasper%20copy.jpg"
        ? "./images/Jasperchat.png"
        : element.image;
    img.src = imageUrl;
    div2.appendChild(img);
    div.classList = "card bg-base-100 shadow-md";
    div.innerHTML = `
        <figure class="px-10 pt-10">
            ${div2.innerHTML}
          </figure>
          <div class="card-body items-start">
            
            <div >
              <ol id="feature" class="list-decimal text-left ml-4">
                ${allFeature.join(" ")}
              </ol>
            </div>
            <div class="w-full h-[1px] bg-slate-200 my-3"></div>
            <div class="w-full flex items-center justify-between">
            <h2 class="card-title">${element.name}</h2>
              <button onclick="showModal(${
                element.id
              })" class="btn btn-outline btn-secondary rounded-full">
                <i class="fa-solid fa-arrow-right fa-lg"></i>
              </button>
            </div>
          </div>
      `;
    display.appendChild(div);
  });
};

getData();

const showModal = async (id) => {
  if (id < 10) {
    id = "0" + id;
  }
  const modal = document.getElementById("modal");
  const basicPlan = document.getElementById("basic-plan");
  const proPlan = document.getElementById("pro-plan");
  const enterprisePlan = document.getElementById("enterprise-plan");
  const chatQuestion = document.getElementById("chat-qes");
  const chatAns = document.getElementById("chat-ans");
  const modalImage = document.getElementById("modal-img");
  const featuresField = document.getElementById("features");
  featuresField.innerHTML = "";
  const integrationsField = document.getElementById("integrations");
  integrationsField.innerHTML = "";

  const header = modal.children[0].children[0];
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  header.innerText = data.data?.description;

  const startPlanObj = data.data?.pricing[0];
  const startVal = Object.values(startPlanObj).reverse().join(" ");

  const proPlanObj = data.data?.pricing[1];
  const proPlanVal = Object.values(proPlanObj).reverse().join(" ");

  const enterprisePlanObj = data.data?.pricing[2];
  const enterprisePlanVal = Object.values(enterprisePlanObj)
    .reverse()
    .join(" ");

  basicPlan.innerText = startVal;
  proPlan.innerText = proPlanVal;
  enterprisePlan.innerText = enterprisePlanVal;
  const dialog = data.data?.input_output_examples[0];

  chatQuestion.innerText = dialog.input;
  chatAns.innerText = dialog.output;
  const features = Object.values(data.data?.features);
  const integrations = Object.values(data.data?.integrations);
  features.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item.feature_name;
    featuresField.appendChild(li);
  });

  integrations.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    integrationsField.appendChild(li);
  });

  modalImage.src = data.data?.image_link[0];
  console.log(data.data?.image_link[0]);
  my_modal_50.showModal();
};
