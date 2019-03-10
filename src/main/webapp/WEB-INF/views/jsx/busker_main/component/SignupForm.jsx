import React from 'react';

import SignupInput from './SignupInput.jsx';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes)

class SignupForm extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
                email : false,
                pw : false,
                pw_value : "",
                pwcheck : false,
                pwcheck_value : "",
                name : false,
                tel : false,
                birthday : false,
                message : {
                    m_email : "",
                    m_pw : "",
                    m_pwcheck : "",
                    m_name : "",
                    m_tel : "",
                    m_birthday : ""
                }
        };
        
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePwCheck = this.handlePwCheck.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        
    }

    
    // Input 값이 바뀔 때 마다 정규식 체크를 함
    handleInputChange = (event) => {
        
        const target = event.target;
        const name = target.name;
        const value = event.target.value;
        
        const yes = document.getElementById("yes-"+name.substring(3));
        const no = document.getElementById("no-"+name.substring(3));
        
        var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식
        var pwReg = /^[A-Za-z0-9]{6,15}$/;

        if (name == "memEmail" && value != "") {
            if (emailReg.test(value)) {
                this.setState({ email : true, message : { ...this.state.message, m_email : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ email : false, message : { ...this.state.message, m_email : "이메일 형식에 맞게 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }   
        else if (name == "memPw" && value != "") {
            
            this.setState({ pw_value : value });
            
            if (pwReg.test(value)) {
                this.setState({ pw : true, message : { ...this.state.message, m_pw : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ pw : false, message : { ...this.state.message, m_pw : "비밀번호를 형식에 맞게 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }
        else if (name == "memPwCheck" && value != "") {
            
            this.setState({ pwcheck_value : value });
            
            if (pwReg.test(value)) {
                this.setState({ pwcheck : true, message : { ...this.state.message, m_pwcheck : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ pwcheck : false, message : { ...this.state.message, m_pwcheck : "비밀번호 확인을 형식에 맞게 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }
        else if (name == "memName") {
            if (value != "") {
                this.setState({ name : true, message : { ...this.state.message, m_name : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ name : false, message : { ...this.state.message, m_name : "이름을 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }
        else if (name == "memTel") {
            if (value != "") {
                this.setState({ tel : true, message : { ...this.state.message, m_tel : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ tel : false, message : { ...this.state.message, m_tel : "전화번호를 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }
        else if (name == "memBirthday") {
            if (value != "") {
                this.setState({ birthday : true, message : { ...this.state.message, m_birthday : "" } });
                yes.style.visibility = 'visible';
                no.style.visibility = 'hidden';
            }
            else {
                this.setState({ birthday : false, message : { ...this.state.message, m_birthday : "생년월일을 입력해주세요." } });
                no.style.visibility = 'visible';
                yes.style.visibility = 'hidden';
            }
        }
        
    }
    
    
    // onChange 딜레이 때문에 onBlur 함수를 이용해 비밀번호 확인을 한번더 체크한다.
    handlePwCheck = (event) => {
        
        if (this.state.pw && this.state.pwcheck) {
            if (this.state.pw_value == this.state.pwcheck_value) {
                this.setState({ message : { ...this.state.message, m_pwcheck : "" } });
                document.getElementById("yes-PwCheck").style.visibility = 'visible';
                document.getElementById("no-PwCheck").style.visibility = 'hidden';
            }
            else {
                this.setState({ message : { ...this.state.message, m_pwcheck : "비밀번호가 일치하지 않습니다." } });
                document.getElementById("no-PwCheck").style.visibility = 'visible';
                document.getElementById("yes-PwCheck").style.visibility = 'hidden';
            }
        }
        
    }

    
    // 회원가입 버튼을 눌렀을 때 마지막 체크를 함
    onClickButton() {
        
        const state = this.state;
        
        if (state.email && state.pw && state.pwcheck && state.name && state.tel && state.birthday && (state.pw_value == state.pwcheck_value)) {
            alert("회원가입 정보가 모두 맞음. form action 진행");
        }
        else {
            alert("회원가입 양식에 맞게 적으세요.");
        }
        
    }

    render() {
        return (
            <div className="top-container">
                <h1>회원가입</h1>
                <SignupInput 
                    type="email"
                    name="memEmail" 
                    placeholder="이메일" 
                    id="memEmail" 
                    yesId="yes-Email" 
                    noId="no-Email" 
                    message={this.state.message.m_email} 
                    onChange={this.handleInputChange}
                />
                <SignupInput 
                    type="password"
                    name="memPw" 
                    placeholder="비밀번호" 
                    id="memPw" 
                    yesId="yes-Pw" 
                    noId="no-Pw" 
                    message={this.state.message.m_pw} 
                    onChange={this.handleInputChange}
                    onBlur={this.handlePwCheck}
                />
                <SignupInput 
                    type="password"
                    name="memPwCheck" 
                    placeholder="비밀번호 확인" 
                    id="memPwCheck" 
                    yesId="yes-PwCheck" 
                    noId="no-PwCheck" 
                    message={this.state.message.m_pwcheck} 
                    onChange={this.handleInputChange}
                    onBlur={this.handlePwCheck}
                />
                <SignupInput 
                    type="text"
                    name="memName" 
                    placeholder="이름" 
                    id="memName" 
                    yesId="yes-Name" 
                    noId="no-Name" 
                    message={this.state.message.m_name} 
                    onChange={this.handleInputChange}
                />
                <SignupInput 
                    type="number"
                    name="memTel" 
                    placeholder="전화번호" 
                    id="memTel" 
                    yesId="yes-Tel" 
                    noId="no-Tel" 
                    message={this.state.message.m_tel} 
                    onChange={this.handleInputChange}
                />
                <SignupInput 
                    type="number"
                    name="memBirthday" 
                    placeholder="생년월일" 
                    id="memBirthday" 
                    yesId="yes-Birthday" 
                    noId="no-Birthday" 
                    message={this.state.message.m_birthday} 
                    onChange={this.handleInputChange}
                />
                
                <button type="button" className="btn" onClick={this.onClickButton}>약관 확인 후 회원가입 하기</button>
            </div>
            
        );
    }
}

export default SignupForm;