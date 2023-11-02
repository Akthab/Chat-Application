import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		console.log('Inside the handle submit');
		setLoading(true);
		e.preventDefault();
		// console.log('Display name', displayName);
		const displayName = e.target[0].value;
		console.log('Display name', displayName);
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		// const auth = getAuth();
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					setErr(true);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						});
						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});

						navigate('/');
					});
				}
			);
		} catch (err) {
			setErr(true);
		}
	};

	return (
		<div className='formContainer'>
			<div className='formWrapper'>
				<span className='logo'>Chat Application</span>
				<span className='title'>Register</span>
				<form onSubmit={handleSubmit}>
					<input required type='text' placeholder='display name' />
					<input required type='email' placeholder='email' />
					<input required type='password' placeholder='password' />
					<input required style={{ display: 'none' }} type='file' id='file' />
					<label htmlFor='file'>
						<img src={Add} alt='' />
						<span>Add an avatar</span>
					</label>
					<button disabled={loading}>Sign up</button>
					{loading && 'Uploading and compressing the image please wait...'}
					{err && <span>Something went wrong</span>}
				</form>
				<p>
					You do have an account? <Link to='/register'>Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
