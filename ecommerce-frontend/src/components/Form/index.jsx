import { FormProvider, useForm } from 'react-hook-form';

function FormWrapper({ children, onSubmit, defaultValues = {}, className }) {
    const methods = useForm({ defaultValues });
    const handleSubmit = methods.handleSubmit((data) => onSubmit(data, methods.reset));
    const { watch } = methods;
    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit} className={className}>
                    {children}
                </form>
            </FormProvider>
        </>
    );
}

export default FormWrapper;
