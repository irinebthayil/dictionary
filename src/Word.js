import React from 'react';
import classes from './Word.module.css';
import playButton from './assets/icon-play.svg'

const Word = (props) => {
    var p = ""
    var audio = null;
    props.phonetics.forEach(element => {
        if(element.text && element.audio != ""){
            p = element.text
            audio = new Audio(element.audio)
        }
    });

    function onPlayAudio(){
        if(audio)
        {
            audio.play()
        } 
    }

    return (
        <div className={classes['parent-div']}>
            <div>
                <h1>{props.word}</h1>
                <p id={classes.phonetic}>{p}</p>
            </div>
            {audio ?
                <div>
                    <img src={playButton} id={classes.playButton} onClick={onPlayAudio} width={45} height={45}/>
                </div> : null
            }
            

        </div>
    )
}

export default Word