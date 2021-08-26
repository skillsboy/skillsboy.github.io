if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) throw "this script only works for non mobile";

let imageUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png";
let imageWidth = "100px";

// inject css
{
    let style = document.createElement("style");

    style.textContent = `
        #custom-scrollbar {
            position: fixed;
            top: 0;
            right: 0;
            width: ${imageWidth};
            aspect-ratio: 1;
            background-image: url(${imageUrl});
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    `;

    document.head.append(style);
}

// inject html
{
    let customScrollbar = document.createElement("div");
    customScrollbar.id = "custom-scrollbar";

    document.body.append(customScrollbar);
}

let documentElement = document.documentElement;
let customScrollbar = document.getElementById("custom-scrollbar");
let maxClientOffset = documentElement.clientHeight - customScrollbar.offsetHeight;

document.onscroll = handleScroll;
window.onresize = handleResize;

dragElement(customScrollbar);

function handleScroll() {
    let clientHeight = window.innerHeight - customScrollbar.offsetHeight;
    let scrollPercent = documentElement.scrollTop / (documentElement.scrollHeight - window.innerHeight);
    let newCustomScrollbarCssTop = clientHeight * scrollPercent;

    customScrollbar.style.top = newCustomScrollbarCssTop + "px";
}

function handleResize() {
    maxClientOffset = documentElement.clientHeight - customScrollbar.offsetHeight;

    updateCustomScrollbarPosition();
}

function dragElement(element) {
    let startMouseYPosition = 0;
    let newMouseYPosition = 0;

    updateCustomScrollbarPosition();

    element.onmousedown = handleStartDrag;

    function handleStartDrag(event) {
        event.preventDefault();

        startMouseYPosition = event.clientY;

        document.onscroll = null;
        document.onmouseup = handleStopDrag;
        document.onmousemove = handleDrag;
    }

    function handleDrag(event) {
        event.preventDefault();

        let top;
        let percentage;

        newMouseYPosition = startMouseYPosition - event.clientY;
        startMouseYPosition = event.clientY;
        top = element.offsetTop - newMouseYPosition;

        if (top < 0) {
            top = 0;
        }

        if (top > maxClientOffset) {
            top = maxClientOffset;
        }

        percentage = top / maxClientOffset;

        documentElement.scrollTop = (documentElement.scrollHeight - window.innerHeight) * percentage;
        element.style.top = top + "px";
    }

    function handleStopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.onscroll = handleScroll;
    }
}

function isPageScrollable() {
    return documentElement.scrollHeight > documentElement.clientHeight;
}

// position the customScrollbar image in sync with real
function updateCustomScrollbarPosition() {
    documentElement.scrollTop += 1;
    documentElement.scrollTop -= 1;
}