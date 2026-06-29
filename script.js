const textInput = document.getElementById("textInput");
const limitInput = document.getElementById("limitInput");

const withSpace = document.getElementById("withSpace");
const withoutSpace = document.getElementById("withoutSpace");
const byteCount = document.getElementById("byteCount");

const progressText = document.getElementById("progressText");
const remainText = document.getElementById("remainText");
const progressFill = document.getElementById("progressFill");
const warningText = document.getElementById("warningText");

const clearBtn = document.getElementById("clearBtn");

function getByteLength(text) {
  return new TextEncoder().encode(text).length;
}

function updateCount() {
  const text = textInput.value;
  const limit = Number(limitInput.value);

  const countWithSpace = text.length;
  const countWithoutSpace = text.replace(/\s/g, "").length;
  const bytes = getByteLength(text);

  const remain = limit - countWithSpace;
  const percent = Math.min((countWithSpace / limit) * 100, 100);

  withSpace.textContent = `${countWithSpace.toLocaleString()}자`;
  withoutSpace.textContent = `${countWithoutSpace.toLocaleString()}자`;
  byteCount.textContent = `${bytes.toLocaleString()} Byte`;

  progressText.textContent = `${countWithSpace.toLocaleString()} / ${limit.toLocaleString()}자`;

  if (remain >= 0) {
    remainText.textContent = `${remain.toLocaleString()}자 남음`;
    warningText.textContent = "";
  } else {
    remainText.textContent = `${Math.abs(remain).toLocaleString()}자 초과`;
    warningText.textContent = `제한 글자 수를 ${Math.abs(remain).toLocaleString()}자 초과했습니다.`;
  }

  progressFill.style.width = `${percent}%`;

  if (countWithSpace > limit) {
    progressFill.style.background = "#d93025";
  } else if (countWithSpace >= limit * 0.9) {
    progressFill.style.background = "#fbbc04";
  } else {
    progressFill.style.background = "";
  }
}

textInput.addEventListener("input", updateCount);
limitInput.addEventListener("change", updateCount);

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  updateCount();
});

updateCount();
