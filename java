const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

ctx.fillStyle = "blue";
ctx.fillRect(100, 100, 100, 100); // Tekent een blauwe vierkant op het canvas
