
export const emailTemplate = {
    // welcome note template 
    welcome:(firstName:string)=>
        `<div>
        <h2> Welcome ${firstName},</h2>
        <p> Thankyou for registering with our Todo App. We are excited to have you </p>
        </div>`,

    // email verification template 
    verify: (firstName: string, code: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${firstName}!</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>Please enter this code in the app to verify your email address.</p>
        <br />
        <p> Thank you,<br/>The Todo App Team</p>
    </div>
    `,

    // email verifcation success message template 
    verifiedSuccess: (firstName: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${firstName},</h2>
      <p> Your account has been verified successfully!</p>
      <p>You can now log in and start using all features.</p>
      <br/>
      <p> Thank you,<br/>The Todo App Team</p>
    </div>
    `
        
    }
