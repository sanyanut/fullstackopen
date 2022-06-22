const PersonForm = ({nameValue, numberValue, nameChange, numberChange, addPerson}) => {
    return (
        <form>
            <div>
                name: <input value={nameValue} onChange={nameChange}/>
            </div>
            <div>
                number: <input value={numberValue} onChange={numberChange}/>
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
      </form>
    )
}

export default PersonForm;