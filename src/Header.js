import React, { useState } from 'react';
import classes from './Header.module.css';
import logo from './assets/logo.svg';
import moonIcon from './assets/icon-moon.svg';
import arrowIcon from './assets/icon-arrow-down.svg'

const Header = (props) => {

    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [fontFilter, setFilter] = useState('Sans Serif');

    function toggleTheme() {
        props.onToggleTheme();
    }

    function onDropDownClicked(){
        setDropDownVisible(prevState => {
            return !prevState;
        })
    }

    function onOptionClick(e){
        setFilter(e.target.innerText)
        setDropDownVisible(false)
        props.setFilter(e.target.innerText)
    }

    return (
        <div className={classes['parent-div']}>
            <div>
                <img src={logo} width={24} height={24} />
            </div>
            <div className={classes['options-div']}>

                <div className={classes["select-container"]}>
                    <div className={classes["select"]} onClick={onDropDownClicked}>
                        <span>{fontFilter}</span>
                        <img src={arrowIcon}/>
                    </div>
                    {dropDownVisible ? <div className={classes["option-container"]}>
                        <div className={`${classes["option"]} ${classes["sans-serif"]}`} onClick={onOptionClick}>
                            Sans Serif
                        </div>
                        <div className={`${classes["option"]} ${classes["serif"]}`} onClick={onOptionClick}>
                            Serif
                        </div>
                        <div className={`${classes["option"]} ${classes["mono"]}`} onClick={onOptionClick}>
                            Mono
                        </div>
                    </div> : null
                    }
                </div>

                <div className={classes['options-div-two']}>
                    <label className={classes.switch}>
                        <input type="checkbox" onClick={toggleTheme} />
                        <span className={`${classes.slider} ${classes.round}`}></span>
                    </label>
                    <img src={moonIcon} />
                </div>
            </div>
        </div>
    )
}

export default Header