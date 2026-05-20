const usersList = document.getElementById("usersList");
const devicesList = document.getElementById("devicesList");

const userByIdForm = document.getElementById("userByIdForm");
const deviceByIdForm = document.getElementById("deviceByIdForm");
const createUserForm = document.getElementById("createUserForm");
const createDeviceForm = document.getElementById("createDeviceForm");

const userByIdResult = document.getElementById("userByIdResult");
const deviceByIdResult = document.getElementById("deviceByIdResult");
const createUserResult = document.getElementById("createUserResult");
const createDeviceResult = document.getElementById("createDeviceResult");

document
  .getElementById("loadUsersButton")
  .addEventListener("click", loadUsers);
document
  .getElementById("loadDevicesButton")
  .addEventListener("click", loadDevices);
document
  .getElementById("refreshAllButton")
  .addEventListener("click", refreshAll);

userByIdForm.addEventListener("submit", handleUserById);
deviceByIdForm.addEventListener("submit", handleDeviceById);
createUserForm.addEventListener("submit", handleCreateUser);
createDeviceForm.addEventListener("submit", handleCreateDevice);

async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request gagal");
  }

  return data;
}

function renderList(container, items, type) {
  if (items.length === 0) {
    container.innerHTML = "<li>Belum ada data.</li>";
    return;
  }

  container.innerHTML = items
    .map((item) => {
      if (type === "user") {
        return `
          <li>
            <p class="item-title">${item.username}</p>
            <p class="meta">ID: ${item.id}</p>
          </li>
        `;
      }

      return `
        <li>
          <p class="item-title">${item.name}</p>
          <p class="meta">ID: ${item.id}</p>
          <p class="meta">Status: ${item.status}</p>
        </li>
      `;
    })
    .join("");
}

function showResult(element, data) {
  element.textContent = JSON.stringify(data, null, 2);
}

async function loadUsers() {
  try {
    const result = await apiFetch("/api/users");
    renderList(usersList, result.data, "user");
  } catch (error) {
    usersList.innerHTML = `<li>${error.message}</li>`;
  }
}

async function loadDevices() {
  try {
    const result = await apiFetch("/api/devices");
    renderList(devicesList, result.data, "device");
  } catch (error) {
    devicesList.innerHTML = `<li>${error.message}</li>`;
  }
}

async function handleUserById(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const id = formData.get("id");

  try {
    const result = await apiFetch(`/api/users/${id}`);
    showResult(userByIdResult, result);
  } catch (error) {
    userByIdResult.textContent = error.message;
  }
}

async function handleDeviceById(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const id = formData.get("id");

  try {
    const result = await apiFetch(`/api/devices/${id}`);
    showResult(deviceByIdResult, result);
  } catch (error) {
    deviceByIdResult.textContent = error.message;
  }
}

async function handleCreateUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = {
    username: formData.get("username"),
  };

  try {
    const result = await apiFetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    showResult(createUserResult, result);
    form.reset();
    await loadUsers();
  } catch (error) {
    createUserResult.textContent = error.message;
  }
}

async function handleCreateDevice(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = {
    name: formData.get("name"),
    status: formData.get("status"),
  };

  try {
    const result = await apiFetch("/api/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    showResult(createDeviceResult, result);
    form.reset();
    await loadDevices();
  } catch (error) {
    createDeviceResult.textContent = error.message;
  }
}

async function refreshAll() {
  await Promise.all([loadUsers(), loadDevices()]);
}

refreshAll();
