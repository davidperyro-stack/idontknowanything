for (let i = 0; i < 20; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = Math.random() < 0.5 ? "🍂" : "🍁";
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.fontSize = 14 + Math.random() * 16 + "px";
    leaf.style.animationDuration = 6 + Math.random() * 8 + "s";
    leaf.style.animationDelay = Math.random() * 8 + "s";
    document.body.appendChild(leaf);
}

const sides = ["left", "right"];
for (const side of sides) {
    const pumpkin = document.createElement("span");
    pumpkin.className = "pumpkin " + side;
    pumpkin.textContent = "🎃";
    document.body.appendChild(pumpkin);
}