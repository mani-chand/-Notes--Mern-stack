const Edit = (props) => {
    return ( 
        <div className="edit">
          <input type="text" placeholder="enter the note" value={props.editNote} className="edit" />
        </div>
     );
}
 
export default Edit;