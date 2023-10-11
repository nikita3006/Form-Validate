 import React ,{useState,useEffect} from 'react'
import './Form.css'
import { cleanup } from '@testing-library/react'


function Form(){
    //making object to save all input value
    const data ={name:'',email:'', phoneNumber:''};

    //handle all value by using useState
    const[formData,setFormData] = useState({
        fname:'',
        phoneNumber:'',
        email:'',
    })

    const[error, setError] =useState({
        msg:"",
    })

    const[darkMode,setDarkMode] = useState(false);

    const[flag, setFlag] =useState(false);


    //with the help of useEffect only one time page will render and when we update dependencies our page will re-render to show message
        useEffect(() =>{
            console.log("ayy")
        },[flag])


    // manage all input data
    const handleChange =(e) =>{
       

        setFormData(
            {...formData, 
                [e.target.name]: e.target.value}  
        )
        // console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
       
    
        if (formData.fname === '' || formData.phoneNumber === '' || formData.email === '') {
            setError({
                message: "please fill all the fields",
            })
         
        }
        else{
            setFlag(true);
          }
       
    }
    

        const toggleDarkMode =()=>{
            setDarkMode(!darkMode);
        }
                // add data to local storage


                useEffect(() => {
                    localStorage.setItem('fname', formData.fname);
                    localStorage.setItem('phoneNumber', formData.phoneNumber);
                    localStorage.setItem('email', formData.email);
                  }, [formData.fname, formData.phoneNumber, formData.email]);
                  


    // to get from local storage

    return(
        <>
        <pre>{(flag) ? <h2>Hello, {formData.fname} ,you're form is submitted</h2> : ''}</pre>
        <div className={`container ${darkMode ? 'dark-Mode' : ''}`}>
            <div class='toggle'>
                <label>
                    DarkMode
                    <input type='checkbox' onChange={toggleDarkMode} checked={darkMode} />
                </label>
            </div>
        

        
            <form onSubmit={handleSubmit} class='form'>
                <label htmlFor='fname' class='form'>First Name:</label>
                <input type="text" name='fname' id='fname' value={formData.fname} onChange={handleChange}></input>
                <br/>
              
                <label htmlFor='phoneNumber' class='form'>Phone Number:</label>
                <input type="number" name='phoneNumber' id='phoneNumber'  value={formData.phoneNumber}  onChange={handleChange}></input>
                <br/>

                <label htmlFor='email' class='form'>Email:</label>
                <input type="email" name='email' id='email'  value={formData.email}  onChange={handleChange}></input>
                <br/>

                <p>{error.message}</p>
                <button>Submit</button>
            </form>
        </div>
        </>
    )
}
export default Form;