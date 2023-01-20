
export const loginConditions = {
    /* Name : {
        rules : {
            length : {
                min: 4,
                max : 16
            }
        }
    }, */
    Email : {
        rules : {
            regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        error : (error) => document.querySelector('#error-email').innerHTML = error
    },
    Password : {
        rules : {
            length : {
                min: 6
            },
            regex : {
                special: /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)&é"'(§è!çà)-^$`ù=:;,]/,
                number : /.[1234567890]/
            }
        },
        error : (error) => document.querySelector('#error-password') .innerHTML = error
    }
}