let startChar = "     ";
let endChar = "     ";
let speed = 150;
let temp = null
let pos = 0;
let first = true
let msg = ''
let timer = null

const titleMarquee = (title = '***', external = false) => {
    if (external) {
        clearTimeout(timer)
        first = true
    }

    if (first)
        msg = startChar + title
    first = false

    let ml = msg.length;

    temp = msg.substring(pos, ml) + endChar + msg.substring(0, pos);
    document.title = temp;

    pos++;
    if (pos > ml) pos = 0;
    timer = setTimeout(titleMarquee, speed);
}


export default titleMarquee
