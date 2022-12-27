import { BookmarkIcon, EyeIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../../App/database/firebase'
import { useStateValue } from '../../../../App/provider/StateProvider'
import getFavicon from '../../../../App/utils/getFavicon'
import { minimizeString } from '../../../../App/utils/minimizeString'
import { fetchUserLinks } from '../../../lib/database/fetchUserLinks'
import { getHostName } from '../../../lib/getHostName'


export default function List({props}) {

    const history = useNavigate()

    const linksFilters = props.InputSearch.length 
    ? 
    (
        props.UserLinks
        .filter(link=> {
            if (props.InputSearch)
            return (link.name.toLowerCase()).includes(props.InputSearch) || (link.id.toLowerCase()).includes(props.InputSearch) || (getHostName(link.url).toLowerCase()).includes(props.InputSearch)
        })
    )
    : 
    (
        props.UserLinks
        .sort((a, b) => {
            if (props.checkFilter === 'oldest') return a.date - b.date
            if (props.checkFilter === 'recent') return b.date - a.date
            return b.views - a.views
        })
        .filter(e=> {
            if (props.checkFilter === 'link-in-bio') return e.linkInBio
            else return e
        })
    )



    const [selectLink, setselectLink] = useState([])

    const selectedLinks = (select) => {
        setselectLink(select.checked ? [...selectLink, select.id] : selectLink.filter(e=> e !== select.id))
    }


    const preDelete = async (number) => {
        props.setMsg({
            title: 'Attention',
            message: `Vous êtes sur le point de supprimer ${number} ${number < 2 ? 'lien' : 'liens'}`,
            question: 'Voulez-vous continuer ?',
            buttonText: 'Supprimer',
            buttonColor: 'red',
            valid: () => deleteLinksSelected(selectLink),
            close: () => props.setMsg([]) && setselectLink([]),
            statu: 'question'
        })
    }


    const deleteLinksSelected = (selectLink) => {
        selectLink.map(selected=> {


            db.collection('links').doc(selected).delete()
            .then(e=> {
                props.setMsg([]) 
            })
            .then(e=> {
                setselectLink([])

                const getNewIdDiv = (document.querySelector('#div-links').childNodes[0].id).split('-')[1]
                history('/stats/' + getNewIdDiv)
                props.setShowStat(getNewIdDiv)
                
            })
        })
    }




    
    return (
        <div className='grid gap'>

            {
                props.Filter &&
                <div className='display gap justify-e'>
                    <div>
                        <button className={(selectLink.length ? 'red' : 'border white') + ' display gap h-2 p-1 border-r-2 '} onClick={e=> preDelete(selectLink.length)}>
                            <span className='c-black'>Suprimer</span>
                        </button>
                    </div>
                    <div>
                        <button 
                            className={(selectLink.length === linksFilters.length ? 'blue ' : 'border white') + ' display gap h-2 p-1 border-r-2'} 
                            onClick={e=> selectLink.length !== linksFilters.length ? setselectLink(linksFilters.map(e=> e.id)) : setselectLink([]) }
                        >
                            <span className='c-black'>Selectioner tout</span>
                        </button>
                    </div>
                </div>
            }


            <div  className='grid gap' id='div-links' >
                {
                    linksFilters
                    .map(link=> {

                        return (
                            
                            <div className='display justify-s-b' id={'link-' + link.id}>
                                <Link to={'/stats/' + link.id} key={link.id} className='w-100p' >
                                    <div    
                                        style={{background: props.LinkID === link.id ? 'var(--hover-btn)' : ''}}
                                        className='display gap p-1 border-b border-r-1 hover border justify-s-b white h-2 click ' 
                                        key={link.id} onClick={e=> props.setShowStat(link.id)} 
                                    >
                                        <div className='display gap-1rem'>
                                            <img src={getFavicon(link)} className='border-r-100' width={30} />
                                            <div className='grid '> 
                                                <div className='display gap-04'>
                                                    <span className='f-s-16'>{minimizeString(link.name, 20)}</span>
                                                    {
                                                        link.linkInBio &&
                                                        <BookmarkIcon width={12} className='c-yellow' />
                                                    }
                                                </div>
                            
                                                <div className='grid gap'>
                                                    <div className='display gap-04'>
                                                        <small href={'https://' + link.shortLink} className='hover-link link'>{link.shortLink}</small>
                                                        <div className='display'>
                                                            <div className='display disable green absolute border-r-04 p-04' id={'link-' + link.id} >
                                                                <small>Copié</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='display gap-1rem'>
                                            <div className='display gap-04 opacity'>
                                                <EyeIcon width={16} />
                                                <small>{link.views}</small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {
                                    props.Filter && 
                                    <div className='display justify-c w-3 h-3 '>
                                        <input 
                                            type='checkbox' 
                                            className='click w-1 h-1'
                                            checked={selectLink.includes(link.id) ? true : false}
                                            onChange={e=> selectedLinks({ checked: e.target.checked, id: link.id }) }  
                                        />
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
