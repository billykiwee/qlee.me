export default function Info({info, id}) {

    return (
        <div className='info-active' id={id}>
            <div>
                <span>{info}</span>
            </div>
        </div>
    )
}