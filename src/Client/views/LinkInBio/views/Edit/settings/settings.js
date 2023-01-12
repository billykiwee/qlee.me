
export const settings = (link_in_bio) => {
    if (!Object.values(link_in_bio).length) return
    
    const { header, background, blocks, text, menu } = link_in_bio 

    const Settings = {
        header : {
            description : {
                color     : header.description.color,
                fontFamily: header.description.fontFamily,
                fontWeight: header.description.fontWeight,
                fontSize  : header.description.fontSize,
                text      : header.description.text,
            },
            title : {
                color     : header.description.color,
                fontFamily: header.description.fontFamily,
                fontWeight: header.description.fontWeight,
                fontSize  : header.description.fontSize,
            }
        },
        background: {
            color: background.color,
            img  : {
                url : background.img.url,
                blur: background.img.blur,
            }
        }, 
        blocks: {
            color    : blocks.color,
            icon     : blocks.icon,
            radius   : blocks.radius,
            textColor: blocks.textColor,
            colorBtn : blocks.colorBtn,
        }, 
        text: {
            color     : text.color,
            fontFamily: text.fontFamily,
        },
        menu: menu
    }
    

    return Settings
}
