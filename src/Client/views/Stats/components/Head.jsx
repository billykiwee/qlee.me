import { BookmarkIcon, CalendarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../../App/utils/formatDate'
import getFavicon from '../../../../App/utils/getFavicon'
import { CopyClip } from '../../Links/views/Edit/components/CopyClip'

export function Head({ topLink }) {
    
    return (
        <div className='grid gap'>

            <Link to={'/edit/' + topLink.id} className='display justify-c'>
                <img src={getFavicon(topLink)} width={80} height={80} className='border-r-100 shadow' /> 
            </Link>

            <div className='grid text-align-c'>
                <div className='display justify-c gap-04'>
                    <span className='f-s-20'>{topLink?.name}</span>
                    {
                        topLink?.linkInBio &&
                        <BookmarkIcon width={12} className='c-yellow' />
                    }
                </div>
                <div className='display gap justify-c'>
                    <a className='f-s-20 link hover-link' href={'https://' + topLink?.shortLink}>{topLink?.shortLink}</a>
                    <CopyClip link={topLink} />
                </div>
            </div>
                <div className='display gap justify-c'>
                    <CalendarIcon width={16} />
                    <span>{formatDate(topLink.date, 'date')}</span>
                </div>
        </div>

    )
}
