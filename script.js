// 1. Auth Handler yang Otomatis Pindahin Data Sign Up ke Form Login
const handleAuth = async (e) => {
    e.preventDefault();
    if(!authUsername || !authPassword) return alert("Isi username & password!");

    if(isSignUp) {
        // Cek apakah username udah ada di IndexedDB
        const exist = await db.users.where('username').equals(authUsername).first();
        if(exist) return alert("Username sudah terpakai, pilih nama lain!");
        
        // Simpan ke IndexedDB
        await db.users.add({ username: authUsername, password: authPassword });
        
        alert("Akun berhasil disimpan! Silakan klik Sign In.");
        setIsSignUp(false); // Otomatis pindah ke mode Login
        // Username & Password TETAP TERISI di form, tinggal klik tombol Sign In!
    } else {
        // Mode Login: Cari user di IndexedDB
        const user = await db.users.where({ username: authUsername, password: authPassword }).first();
        if(!user) return alert("Username atau Password salah / belum terdaftar!");
        
        setCurrentUser(user);
        await loadCompanies(user.id);
    }
};
