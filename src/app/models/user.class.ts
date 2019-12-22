export class User {
    public FirstName: string;
    public LastName: string;
    public UserName: string;
    public Password: string;
    public Email: string;
    
    constructor(firstName: string, lastName: string, userName: string, password: string, email: string)    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.UserName = userName;
        this.Password = password;
        this.Email = email;
    }
}
