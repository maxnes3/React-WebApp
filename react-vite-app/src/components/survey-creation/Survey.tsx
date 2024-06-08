import './Survey.css'
import {SubmitButton} from "../SubmitButton.tsx";

const AddQuestion = () => {

}

export default function Survey() {
  return (
    <div>
      <input placeholder="Название опроса" />
      <SubmitButton label={'+'} onClick={AddQuestion}/>
    </div>
  );
}