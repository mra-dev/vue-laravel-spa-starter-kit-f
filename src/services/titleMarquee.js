let startChar = "     ";
let endChar = "     ";
let speed = 150;
let temp = null
let pos = 0;
let msg  = startChar + document.title;

const titleMarquee = () => {
    let ml = msg.length;

    temp = msg.substring(pos, ml) + endChar + msg.substring(0, pos);
    document.title = temp;

    pos++;
    if (pos > ml) pos = 0;
    setTimeout(titleMarquee, speed);
}


export default titleMarquee
