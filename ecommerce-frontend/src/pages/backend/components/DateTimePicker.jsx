import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { Box } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';
const DateTimePicker = ({ name, required, label }) => {
    const { control } = useFormContext();
    const date = dayjs();

    return (
        <div>
            <Box sx={{ transform: 'scale(0.85)' }}>
                <div className="flex items-center gap-2">
                    <label htmlFor={'stardate'} className="text-gray-700   text-[15px] mb-1   ">
                        {label}
                    </label>
                    <span className="text-red-500">*</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name={name}
                        control={control}
                        rules={{ required: required }}
                        render={({ field, fieldState }) => (
                            <DesktopDateTimePicker
                                value={field.value ? dayjs(field.value) : null}
                                onChange={field.onChange}
                                format="DD-MM-YYYY"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        helperText: fieldState.error?.message,
                                        sx: {
                                            '& .MuiFormHelperText-root': {
                                                margin: '0 1px ',
                                                padding: 0,
                                                color: 'red',
                                                fontStyle: 'italic',
                                                fontSize: '15px',
                                            },
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Box>
        </div>
    );
};

export default DateTimePicker;
