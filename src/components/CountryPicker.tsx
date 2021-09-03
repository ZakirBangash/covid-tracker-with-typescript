import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { FetchCountry } from '../Services/api'
// import { FetchData } from './FetchData'
import { covid_types,countryInfo } from "../Types/covid_types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 320,
    },
    contain: {
        display: 'flex',
        justifyContent: 'center'
    },
}));

type fnc = {
    callback: (name: string) => void;
}

 const CountryPicker : React.FC<fnc>  = ({callback}) => {

    const classes = useStyles();
    const [state, setState] = useState<countryInfo[]>();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            const data = await FetchCountry();
            console.log(data)
            setLoad(true)
            setState(data);
        }
        
        fetchCount();
    }, [])

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> | undefined = async (event) => {
        const name = event.target.value;
          callback(name);
    };

    if (!load) {
        return (

            <div>
                <h1>Loading....</h1>
            </div>
        )

    } else {
        return (
            <div className={classes.contain}>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        onChange={handleChange}
                    >
                        <option value='' >Global</option>
                        {state?.map((ind : countryInfo) => <option value={ind.name}> {ind.name} </option>)}
                    </NativeSelect>
                </FormControl>
            </div>
        );
    }

}


export default CountryPicker;