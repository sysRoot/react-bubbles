import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/';

const initialColor = {
    color: '',
    code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
    console.log(colors);
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);

    useEffect(() => {
        axiosWithAuth()
            .get('/colors')
            .then((response) => updateColors(response.data))
            .catch((error) => console.log(error));
    }, [colors, editing]);

    const editColor = (color) => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = (e, color) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/colors/${color.id}`, color)
            .then((response) => {
                console.log('Put Response', response);
                setEditing(false);
                setColorToEdit(color);
            })
            .catch((error) => {
                console.log('Put Error', error);
            });
    };

    const deleteColor = (color) => {
        axiosWithAuth()
            .delete(`/colors/${color.id}`)
            .then((response) => {
                console.log('Del Response', response);
            })
            .catch((error) => {
                console.log('Del Error', error);
            });
    };

    return (
        <div className='colors-wrap'>
            <p>colors</p>
            <ul>
                {colors.map((color) => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span
                                className='delete'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteColor(color);
                                }}
                            >
                                x
                            </span>{' '}
                            {color.color}
                        </span>
                        <div
                            className='color-box'
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={(e) => saveEdit(e, colorToEdit)}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    color: e.target.value,
                                })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={(e) =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value },
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className='button-row'>
                        <button type='submit'>save</button>
                        <button onClick={() => setEditing(false)}>
                            cancel
                        </button>
                    </div>
                </form>
            )}
            <div className='spacer' />
            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
