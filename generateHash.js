// Hash testing 

const bcrypt = require('bcrypt');

(async () => {
    const testPassword = "password";
    const testHash = await bcrypt.hash(testPassword, 10); // Ensure 10 salt rounds
    console.log("New test hash for 'password':", testHash);
})();


