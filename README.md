
## Installation

Ensure you have the last cli 

```npm i -g expo-cli```

``` expo install ```

Edit config.ts to enable the correct back-end url

## Run

``` expo start ```

## Form Validations
    const { handleSubmit, register, errors, setValue } = useForm({ mode: "onSubmit" });
    const onSubmit = values => alert(JSON.stringify(values))
    
    enum F {
        email,
        password
    }
    const Validator = useValidator()

    useEffect(() => {
        register(F[F.email], Validator.email(true));
        register(F[F.password], Validator.required())
    }, [register])


     <TextInput placeholder="Email" onChangeText={t => setValue(F[F.email], t, { shouldValidate: true })} />
     <FieldError errors={errors} name={F[F.email]} />
## Scripts 

### Generate a component or a view

Component :```npm run g c your-component-in-kebab-case```

View :```npm run g v your-component-in-kebab-case```

Model :```npm run g m your-model-in-kebab-case```

Will Generate  .tsx , .stories.tsx and .d.ts files

# Theming text

See theme.ts and component t to add variant and theming


# Debug 

## Store in console

log window.store

## Debugger

Download react native debugger

In the app ctrl+D - Remote debug

Sometimes the default debugger open on another port ( example 19000, if so you can change the default port of react native debugger)

```open "rndebugger://set-debugger-loc?host=localhost&port=19000"```


# TroubleShouting

Problem : Unexpected Network error: Unexpected token o in JSON at position 1 

Solution : (restart your mac)