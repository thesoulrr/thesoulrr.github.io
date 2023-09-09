// RESPONSIVE NAV

const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
})

// Mouse Tracker & Invisible Slider
const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth/2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageBuffer = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageBuffer, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {transform: `translate(${nextPercentage}%, -50%)`},
        {duration: 1200, fill: "forwards"}
    );
    
    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            { objectPosition: `${100 + nextPercentage}% center` },
            { duration: 1200, fill: "forwards" }
        );
    }

}

