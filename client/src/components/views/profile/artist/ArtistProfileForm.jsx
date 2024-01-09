const ArtistProfileForm = ({ username, handleUsernameChange }) => {
    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title" style={{ fontSize: "3.5em" }}>create profile</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">username</label>
                    <input 
                        value={username} 
                        onChange={(e) => handleUsernameChange(e)} 
                        className="form-input" id="username" 
                        name="username" 
                    />
                </div>
            </div>
        </div>
    )
}

export default ArtistProfileForm;