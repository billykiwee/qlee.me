
<<<<<<< HEAD
export function MouseUpAction({actions}) {

    let mousedownID

    if(mousedownID==-1)  
    mousedownID = setTimeout(e=> whilemousedown(), 600);

=======
    function deleteMessage(msg) {
        if(mousedownID==-1)  
        mousedownID = setTimeout(e=> whilemousedown(msg), 600);
    }
>>>>>>> 6bc64a66aefaaa863c56c0bfb441b0b5821bc8de

    function mouseup() {
        if(mousedownID!=-1) { 
            clearInterval(mousedownID)
            mousedownID=-1
        }
    }
<<<<<<< HEAD
    mouseup()

    function whilemousedown() {
        return actions
    }
}

=======

    function whilemousedown(msg) {
        const btn = document.querySelector('.' + msg)

        btn.classList.add('delete')
        setTimeout(e=> {
            if (btn.classList[2] === 'delete') {
                window.onclick = (w) => {
                    if (w.target !== btn) btn.classList.remove('delete')
                }
            }
        }, 800)

    }
>>>>>>> 6bc64a66aefaaa863c56c0bfb441b0b5821bc8de
