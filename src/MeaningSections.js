import React from 'react';
import classes from './MeaningSections.module.css'

const MeaningSections = (props) => {
    return (
        <div className={classes['parent-div']}>
            <div className={classes['type-div']}>
                <h4>{props.meanings.partOfSpeech}</h4>
                <span />
            </div>
            <div className={classes['meaning-div']}>
                <p>Meaning</p>
                <ul>
                    {
                        props.meanings.definitions.map((item, i) => (
                            <li key={i}>
                                <span>{item.definition}</span>
                                {item.example ? <p id={classes.examplePara}>"{item.example}"</p> : null}
                                
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                props.meanings.synonyms.length > 0 ?
                    <div className={classes['synonyms-div']}>
                        <span id={classes.synonymHeading}>Synonyms</span>
                        <span id={classes.synonymText}>{props.meanings.synonyms.join(", ")}</span>
                    </div> : null
            }


        </div>
    )
}

export default MeaningSections