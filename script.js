const validationRules = {
  "full-name": [
    {
      test: (value) => value.trim().length > 0,
      errMessage: "Заповніть це поле",
    },
    {
      test: (value) => value.trim().length >= 5,
      errMessage: "Мале значення ПІБ. Вкажіть прізвище та ініціали",
    },
    {
      test: (value) =>
        /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+ [A-Za-zА-Яа-яІіЇїЄєҐґ]\.[A-Za-zА-Яа-яІіЇїЄєҐґ]\.$/.test(
          value.trim(),
        ),
      errMessage: "Невірний формат. Вкажіть у форматі: Прізвище І.О.",
    },
  ],
  "group": [
    {
      test: (value) => value.trim().length > 0,
      errMessage: "Заповніть це поле",
    },
    {
      test: (value) => /^[A-ZА-ЯІЇЄҐ]{2}\-\d{2}$/.test(value.trim()),
      errMessage: "Невірний формат. Вкажіть у форматі: АА-11",
    },
  ],
  "phone": [
    {
      test: (value) => value.trim().length > 0,
      errMessage: "Заповніть це поле",
    },
    {
      test: (value) => /^\(\d{3}\)\-\d{3}\-\d{2}\-\d{2}$/.test(value.trim()),
      errMessage: "Невірний формат. Вкажіть у форматі: (000)-000-00-00",
    },
  ],
  "address": [
    {
      test: (value) => value.trim().length > 0,
      errMessage: "Заповніть це поле",
    },
    {
      test: (value) => /^м\. \d+$/.test(value.trim()),
      errMessage: "Невірний формат. Вкажіть у форматі: м. 12345",
    },
  ],
  "email": [
    {
      test: (value) => value.trim().length > 0,
      errMessage: "Заповніть це поле",
    },
    {
      test: (value) => /^[a-z0-9\._]+\@[a-z]+\.com$/.test(value.trim()),
      errMessage: "Невірний формат. Вкажіть у форматі: example@gmail.com",
    },
  ],
};

function getError(input) {
  const rules = validationRules[input.id] || [];
  const value = input.value;

  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.errMessage;
    }
  }

  return "";
}

const form = document.getElementById("student-form");
const info = document.getElementById("student-info");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = form.querySelectorAll('input:not([type="submit"])');
  let isFormValid = true;

  inputs.forEach((input) => {
    input.classList.remove("valid-input", "invalid-input");

    const errorElement = input.nextElementSibling;
    const errorMessage = getError(input);

    if (errorMessage === "") {
      input.classList.add("valid-input");
      errorElement.textContent = "";
    } else {
      input.classList.add("invalid-input");
      isFormValid = false;

      if (errorElement && errorElement.classList.contains("error-text")) {
        errorElement.textContent = errorMessage;
      }
    }
  });

  if (!isFormValid && info.classList.contains("show")) {
    info.classList.remove("show");
  }

  if (isFormValid) {
    const fullName = document.getElementById("full-name").value;
    const group = document.getElementById("group").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    info.innerHTML = `
      <h1>Введені дані:</h1>
      <p><b>ПІБ</b>: ${fullName}</p>
      <p><b>Група</b>: ${group}</p>
      <p><b>Телефон</b>: ${phone}</p>
      <p><b>Адреса</b>: ${address}</p>
      <p><b>Пошта</b>: ${email}</p>
    `;

    info.classList.add("show");
  }
});

const table = document.getElementById("color-picker-table");
let cellNumber = 1;

function getPickedColor() {
  return document.getElementById("color-picker").value;
}

function getRandomHexColor() {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let row = 0; row < 6; row++) {
  const tr = document.createElement("tr");

  for (let cell = 0; cell < 6; cell++) {
    const td = document.createElement("td");
    td.textContent = cellNumber;

    if (cellNumber == 5) {
      td.addEventListener("mouseenter", () => {
        td.style.backgroundColor = getRandomHexColor();
      });
      td.addEventListener("click", () => {
        td.style.backgroundColor = getPickedColor();
      });
      td.addEventListener("dblclick", () => {
        coloredTableDblClick();
      });
    }
    tr.appendChild(td);
    cellNumber++;
  }
  table.appendChild(tr);
}

function coloredTableDblClick() {
  const pickedColor = getPickedColor();
  const cells = table.querySelectorAll("td");

  cells.forEach((cell) => {
    if (cell.textContent === "5") {
      return;
    }
    cell.style.backgroundColor = pickedColor;
  });
}
