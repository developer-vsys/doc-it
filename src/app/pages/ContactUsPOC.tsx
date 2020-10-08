import { Button, CircularProgress, InputProps, makeStyles, TextField, Theme, Typography, useTheme } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import emailjs from 'emailjs-com';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: theme.spacing(4),
    },
    textBlock: {
        marginBottom: theme.spacing(4),
    },
    link: {
        fontWeight: 600,
        color: theme.palette.primary.main,
        textTransform: 'none',
        textDecoration: 'none',
        '&:visited': {
            color: theme.palette.primary.main,
        },
    },
    inputField: {
        marginTop: theme.spacing(3),
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(4),
        justifyContent: 'flex-end',
    },
    submitButton: {
        width: '100px'
    }
}));

type FormError = undefined | null | string;
type OnChangeHandler = InputProps['onChange'];
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

export const ContactUsPOC: React.FC = (): JSX.Element => {
    usePageTitle('Contact Us POC');

    // update the following 3 constants to use appropriate values after setting up account for pxblue@eaton.com on emailjs.com
    const SERVICE_ID = 'service_z4o1ech';
    const TEMPLATE_ID = 'template_gh8uhfo';
    const USER_ID = 'user_A5pJ3jZWfa6hCgvSSfkao';

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<FormError>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<FormError>(null);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState<FormError>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const theme = useTheme();
    const classes = useStyles(theme);

    const validateName = useCallback(
        (value: string): void => {
            const tempInput = value;
            let tempInputError = null;
            if (!tempInput.trim()) {
                tempInputError = 'name is required';
            }
            setNameError(tempInputError);
        },
        [setNameError]
    );

    const onNameChange: OnChangeHandler = useCallback(
        (event) => {
            setName(event.target.value);
            validateName(event.target.value);
        },
        [setName, validateName]
    );

    const onNameBlur = useCallback((): void => {
        validateName(name);
    }, [validateName, name]);

    const validateEmail = useCallback(
        (value: string): void => {
            const tempEmail = value;
            let tempEmailError = '';
            if (!tempEmail.trim()) {
                tempEmailError = 'email is required';
            } else if (!emailRegex.test(tempEmail)) {
                tempEmailError = 'Invalid email address';
            }
            setEmailError(tempEmailError);
        },
        [setEmailError]
    );

    const onEmailChange: OnChangeHandler = useCallback(
        (event) => {
            setEmail(event.target.value);
            if (emailError) {
                validateEmail(event.target.value);
            } else {
                setEmailError(null);
            }
        },
        [setEmail, emailError, validateEmail, setEmailError]
    );

    const onEmailBlur = useCallback((): void => {
        validateEmail(email);
    }, [validateEmail, email]);

    const validateMessage = useCallback(
        (value: string): void => {
            const tempInput = value;
            let tempInputError = null;
            if (!tempInput.trim()) {
                tempInputError = 'message is required';
            }
            setMessageError(tempInputError);
        },
        [setMessageError]
    );

    const onMessageChange: OnChangeHandler = useCallback(
        (event) => {
            setMessage(event.target.value);
            validateMessage(event.target.value);
        },
        [setMessage, validateMessage]
    );

    const onMessageBlur = useCallback((): void => {
        validateMessage(message);
    }, [validateMessage, message]);

    const isFormValid = useCallback(
        (): boolean => name !== '' && emailRegex.test(email) && message !== '',
        [name, email, message]
    );

    const submitEmail = (): void => {
        setIsSubmitting(true);

        const emailParams = {
            name: name,
            email: email,
            message: message
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID)
            .then((result: any) => {
                if(result) {
                    setName('');
                    setEmail('');
                    setMessage('');
                    setIsSubmitting(false);

                    // display success message
                }
            }, (error: any) => {
                // eslint-disable-next-line no-console
                console.log(error.text);

                // display error message
            });
    }

    return (
        <>
            <div className={classes.content}>
                <Typography variant={'body1'} className={classes.textBlock}>
                    If you have any questions or feedback about PX Blue or how to use it, you can use the contact form below or email the team directly at <a href="mailto:pxblue@eaton.com" className={classes.link}>
                        pxblue@eaton.com</a>. We typically respond to all inquiries within one business day.
                </Typography>

                <Typography variant={'body1'} className={classes.textBlock}>
                    We look forward to hearing from you!
                </Typography>

                {/* name */}
                <TextField
                    id={'name'}
                    label={'Name'}
                    fullWidth
                    helperText={nameError || ''}
                    required
                    value={name}
                    onChange={onNameChange}
                    error={Boolean(nameError)}
                    onBlur={onNameBlur}
                    variant={'filled'}
                />

                <TextField
                className={classes.inputField}
                id={'email'}
                label={'Email Address'}
                helperText={emailError || ''}
                fullWidth
                required
                value={email}
                error={Boolean(emailError)}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                variant={'filled'}
            />

                <TextField
                    id={'message'}
                    label={'Message'}
                    className={classes.inputField}
                    fullWidth
                    multiline
                    rows={6}
                    helperText={messageError || ''}
                    required
                    value={message}
                    onChange={onMessageChange}
                    error={Boolean(messageError)}
                    onBlur={onMessageBlur}
                    variant={'filled'}
                />
                <div className={classes.buttonContainer}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        disabled={!isFormValid()}
                        className={classes.submitButton}
                        onClick={(): void => {
                            submitEmail();
                        }}
                    >
                        {isSubmitting ? <CircularProgress style={{height: '24px', width: '24px', color: Colors.white[50]}} /> : 'Submit'}
                    </Button>
                </div>
            </div>
        </>
    )
};
