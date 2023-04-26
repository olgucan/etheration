import Form from 'react-bootstrap/Form';

function CheckExample({type,label}) {
  return (
    <Form >
    
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`${label}`}
            name="da"
          />

          
        </div>
     
    </Form>
  );
}

export default CheckExample;