import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ExpenseSlip from '../components/ExpenseSlip';
import PreviousExpenseSlip from '../components/PreviousExpense';
import { AnimatePresence, motion } from 'framer-motion';
import axios from "axios";

const Expense = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [currUnit, setCurrUnit] = useState("");
    const [options, setOptions] = useState(false);
    const [currTitle, setCurrTitle] = useState("");
    const [expenses, setExpenses] = useState({}); // State to manage checkbox and quantity for current month's calculation
    const [totalExpense, setTotalExpense] = useState(0); // State for total calculated expense
    const [slip, setSlip] = useState(false); // State to control the modal visibility
    const [previousSlip, setPreviousSlip] = useState(false); // State to control the modal visibility
    const [selectedMonth, setSelectedMonth] = useState("");
    const [language, setLanguage] = useState('en'); // default to English

    const [defaultBills, setDefaultBills] = useState({
        waterBill: 0,
        gasBill: 0,
        trashBill: 0,
        garageBill: 0,
        electricityBill: 0,
        price: 0, // Assuming unit price is also a default bill
    });

    const {
        ads,
        toast,
        toggleRefreshAds,
    } = useOutletContext();

    const calculateTotal = () => {
        let currentTotal = 0;
        const selectedAd = ads.find(ad => ad._id === currUnit);

        if (selectedAd) {
            // Check if Unit is selected (assuming 'price' is the unit rent)
            if (expenses.unit?.isChecked) {
                currentTotal += selectedAd.price || 0;
            }
            // Check if Water is selected
            if (expenses.water?.isChecked) {
                currentTotal += selectedAd.waterBill || 0; // Use waterBill from ad
            }
            // Check if Trash is selected
            if (expenses.garbage?.isChecked) {
                currentTotal += selectedAd.trashBill || 0; // Use trashBill from ad
            }
            // Check if Garage is selected
            if (expenses.garage?.isChecked) {
                currentTotal += selectedAd.garageBill || 0; // Use garageBill from ad
            }
            // Check if Gas is selected
            if (expenses.gas?.isChecked) {
                currentTotal += selectedAd.gasBill || 0; // Use gasBill from ad
            }
            // Check if Electricity is selected and calculate with quantity
            if (expenses.electricity?.isChecked && expenses.electricity?.quantity) {
                currentTotal += (expenses.electricity.quantity * selectedAd.electricityBill); // Assuming 9TK per unit
            }
        }
        setTotalExpense(currentTotal);
    };

    useEffect(() => {
        calculateTotal();
    }, [expenses, currUnit, ads]); // Depend on ads as well, in case they load later or update

    useEffect(() => {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        const formatted = now.toLocaleString("en-US", { month: "long", year: "numeric" });
        setSelectedMonth(formatted);
        const selectedAd = ads.find(ad => ad._id === currUnit);
        if (selectedAd) {
            setCurrTitle(`${selectedAd.unitId || selectedAd.title} - ${selectedAd.renter || ''}`);
            // When a new unit is selected, reset the expenses state for that unit
            setExpenses({
                unit: { isChecked: true }, // Unit is typically always charged
                water: { isChecked: true },
                garbage: { isChecked: true },
                garage: { isChecked: false },
                gas: { isChecked: true },
                electricity: { isChecked: true, quantity: 0 }
            });
            // Set the default bills state from the selected ad
            setDefaultBills({
                waterBill: selectedAd.waterBill || 0,
                gasBill: selectedAd.gasBill || 0,
                trashBill: selectedAd.trashBill || 0,
                garageBill: selectedAd.garageBill || 0,
                electricityBill: selectedAd.electricityBill || 0,
                price: selectedAd.price || 0, // Load initial unit price
            });
        } else {
            setCurrTitle("");
            setExpenses({}); // Clear expenses if "Default" is selected
            setDefaultBills({ waterBill: 0, gasBill: 0, trashBill: 0, garageBill: 0, price: 0 }); // Reset
        }
    }, [currUnit, ads]);

    const onChangeUnit = (e) => {
        setCurrUnit(e.target.value);
    };

    // Handle change for default bill inputs
    const handleDefaultBillChange = (billType, value) => {
        setDefaultBills(prev => ({
            ...prev,
            [billType]: parseFloat(value) || 0 // Parse to float for numbers
        }));
    };

    const saveDefaultBills = async () => {
        if (!currUnit) {
            toast.error("Please select a unit before saving!");
            return;
        }

        try {
            const response = await axios.put(
                backendURL + `/api/ads/updateexpenses/${currUnit}`, // Use your existing updateAd route
                defaultBills // Send the state directly, as its keys match model fields
            );
            // ✅ Refresh ads after saving
            if (toggleRefreshAds) {
                await toggleRefreshAds();
            }
            toast.success("Updated successfully!");
            setOptions(false); // Close the options after saving
        } catch (error) {
            toast.error("Failed. Please try again.");
        }
    };

    const handleCheckboxChange = (expenseType, isChecked) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [expenseType]: {
                ...prevExpenses[expenseType],
                isChecked: isChecked
            }
        }));
    };

    const handleQuantityChange = (expenseType, quantity) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [expenseType]: {
                ...prevExpenses[expenseType],
                quantity: parseInt(quantity) || 0 // Ensure it's a number
            }
        }));
    };

    const saveMonthlyExpenses = async () => {
        if (!currUnit) {
            toast.error("Please select a unit before saving expenses.");
            return;
        }

        const selectedAd = ads.find(ad => ad._id === currUnit);
        if (!selectedAd) {
            toast.error("Selected unit details not found.");
            return;
        }

        // Prepare the data to send to the backend, aligning with schema requirements
        const monthlyExpenseData = {
            month: selectedMonth,
            waterBill: expenses.water?.isChecked ? (selectedAd.waterBill || 0) : 0,
            gasBill: expenses.gas?.isChecked ? (selectedAd.gasBill || 0) : 0,
            trashBill: expenses.garbage?.isChecked ? (selectedAd.trashBill || 0) : 0,
            garageBill: expenses.garage?.isChecked ? (selectedAd.garageBill || 0) : 0,
            electricityBill: expenses.electricity?.isChecked ? (expenses.electricity.quantity * selectedAd.electricityBill) : 0,
            totalBill: totalExpense
        };

        // Frontend validation for required fields before sending to backend
        if (
            !monthlyExpenseData.waterBill &&
            !monthlyExpenseData.gasBill &&
            !monthlyExpenseData.trashBill &&
            !monthlyExpenseData.garageBill &&
            !monthlyExpenseData.electricityBill &&
            !expenses.unit?.isChecked // Check if unit (rent) is also selected
        ) {
            toast.warn("No expenses selected to save.");
            return;
        }

        try {
            // Your API endpoint to add monthly expenses for a specific ad
            const response = await axios.post(backendURL + `/api/ads/monthlyexpenses/${currUnit}`, monthlyExpenseData);
            toast.success("Monthly expenses saved successfully!");

            // ✅ Refresh ads after saving
            if (toggleRefreshAds) {
                await toggleRefreshAds();
            }
        } catch (error) {
            toast.error("Failed to save monthly expenses. Please try again.");
        }
    };

    const deleteMonthlyExpense = async (expenseId) => {
        if (!currUnit) {
            toast.error("Please select a unit before deleting.");
            return;
        }

        try {
            const response = await axios.delete(
                `${backendURL}/api/ads/deletemonthlyexpenses/${currUnit}?expenseId=${expenseId}`
            );

            toast.success("Deleted successfully!");

            if (toggleRefreshAds) {
                await toggleRefreshAds();
            }
        } catch (error) {
            toast.error("Failed to delete!");
        }
    };


    const selectedAdForDisplay = ads.find(ad => ad._id === currUnit);

    return (
        <div className="min-h-screen dark:bg-bg-dark bg-bg-light">
            <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8">
                <h2 className="text-4xl sm:text-5xl font-neueplak-black sm:mb-5 mt-18 mb-8 dark:text-title-dark text-title-light">Expenses Tracker</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 grid-rows-[0fr_2fr] md:grid-rows-[1fr_3fr] gap-2 sm:gap-4">
                    {/*Calculate Expenses*/}
                    <div className="col-start-1 gap-2 row-start-2 col-span-2 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-3 dark:bg-card-dark bg-card-light shadow-sm border-1 border-subtitle-dark/20 rounded-2xl sm:p-4 p-2 flex flex-col">
                        <h3 className="sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Select unit</h3>
                        <div className='mb-3 relative'>
                            <select
                                className='w-full p-3 py-2 sm:text-2xl text-xl rounded-xl dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light appearance-none'
                                onChange={onChangeUnit}
                                name="unit"
                                id="unit"
                                value={currUnit}
                            >
                                <option value="">Default</option>
                                {ads
                                    .slice() // create a copy to avoid mutating the original array
                                    .sort((a, b) => a.unitId.localeCompare(b.unitId)) // sort by unitId A-Z
                                    .map((ad) => (
                                        <option key={ad._id} value={ad._id}>
                                            {`${ad.unitId} - ${ad.renter || 'No Renter'}`}
                                        </option>
                                    ))}
                            </select>

                            {/* Custom Dropdown Icon */}
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-400 dark:text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className='w-full flex justify-between'>
                            <h3 className="sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Expenses</h3>
                            <div onClick={() => setOptions(prevOptions => !prevOptions)} className='flex justify-center items-center dark:text-subtitle-dark text-subtitle-light'>
                                <button disabled={!currUnit}>
                                    {options ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 rotate-90">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {
                            options && (
                                <div className='w-full sm:p-4 p-2 dark:bg-bg-dark bg-bg-light border-1 border-subtitle-dark/20 rounded-xl dark:text-subtitle-dark text-subtitle-light'>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='sm:text-xl text-lg font-medium dark:text-title-dark text-title-light'>Default Bill Settings</h3>
                                        <div className='flex flex-col gap-2 h-full text-subtitle-light dark:text-subtitle-dark'>
                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Unit Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.price || ''}
                                                        onChange={(e) => handleDefaultBillChange('price', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Water Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.waterBill || ''}
                                                        onChange={(e) => handleDefaultBillChange('waterBill', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Gas Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.gasBill || ''}
                                                        onChange={(e) => handleDefaultBillChange('gasBill', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Trash Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.trashBill || ''}
                                                        onChange={(e) => handleDefaultBillChange('trashBill', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Garage Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.garageBill || ''}
                                                        onChange={(e) => handleDefaultBillChange('garageBill', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                                <p>Electricity Fee</p>
                                                <div className='flex items-center justify-between gap-1'>
                                                    <input
                                                        className='p-1 w-20 text-center rounded-md bg-card-light dark:bg-card-dark text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                        type="number"
                                                        min="0" // Prevent negative quantities
                                                        value={defaultBills.electricityBill || ''}
                                                        onChange={(e) => handleDefaultBillChange('electricityBill', e.target.value)}
                                                        disabled={!options} // Disable if not checked
                                                    />
                                                    <span>TK</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-start mt-2 items-center'>
                                            <button
                                                onClick={saveDefaultBills}
                                                className='p-2 px-3 dark:bg-indigo-700 bg-indigo-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-sm hover:opacity-80 cursor-pointer'
                                                disabled={!currUnit}
                                            >
                                                update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="relative w-full sm:p-4 p-2 flex flex-col gap-2 dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light rounded-xl overflow-hidden" >
                            <div className="sm:text-xl text-lg font-medium flex items-center gap-2">
                                <h3>{currTitle ? `${currTitle}` : "Select a unit"}</h3>
                                {/* Select Month */}
                                <select
                                    className={`${currTitle ? 'block' : 'hidden'} w-fit p-1 rounded-xl border dark:border-subtitle-dark/50 border-subtitle-dark/50 dark:bg-bg-dark bg-bg-light`}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    value={selectedMonth}
                                >
                                    {Array.from({ length: 12 }).map((_, index) => {
                                        const date = new Date();
                                        date.setMonth(date.getMonth() - index);
                                        const formatted = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                                        return <option key={index} value={formatted}>{formatted}</option>;
                                    })}
                                </select>
                            </div>
                            <span className='my-2 w-full h-[1px] dark:bg-subtitle-dark/50 bg-subtitle-light/60'></span>
                            {/*Container*/}
                            {selectedAdForDisplay ? (
                                <div className='flex flex-col gap-2'>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.unit?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('unit', e.target.checked)}
                                            />
                                            <p>Unit (Rent)</p>
                                        </div>
                                        <div>
                                            <p>{selectedAdForDisplay.price || 0} TK</p>
                                        </div>
                                    </div>

                                    <div className=' flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.water?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('water', e.target.checked)}
                                            />
                                            <p>Water</p>
                                        </div>
                                        <div>
                                            <p>{selectedAdForDisplay.waterBill || 0} TK</p> {/* Changed to waterBill */}
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.garbage?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('garbage', e.target.checked)}
                                            />
                                            <p>Trash</p>
                                        </div>
                                        <div>
                                            <p>{selectedAdForDisplay.trashBill || 0} TK</p> {/* Changed to trashBill */}
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.garage?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('garage', e.target.checked)}
                                            />
                                            <p>Garage</p>
                                        </div>
                                        <div>
                                            <p>{selectedAdForDisplay.garageBill || 0} TK</p> {/* Changed to garageBill */}
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.gas?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('gas', e.target.checked)}
                                            />
                                            <p>Gas</p>
                                        </div>
                                        <div>
                                            <p>{selectedAdForDisplay.gasBill || 0} TK</p> {/* Changed to gasBill */}
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border cursor-pointer checked:bg-blue-600 checked:border-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.electricity?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('electricity', e.target.checked)}
                                            />
                                            <p>Electricity</p>
                                        </div>
                                        <div className='flex items-center justify-between gap-2'>
                                            <input
                                                className='p-1 w-20 border text-center rounded-xl dark:border-subtitle-dark/50 border-subtitle-light/50 text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                type="number"
                                                min="0" // Prevent negative quantities
                                                value={expenses.electricity?.quantity || ''}
                                                onChange={(e) => handleQuantityChange('electricity', e.target.value)}
                                                disabled={!expenses.electricity?.isChecked} // Disable if not checked
                                            />
                                            <span>x</span>
                                            <p>{selectedAdForDisplay.electricityBill} TK</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className='text-center text-red-500'>Please select a unit to view expenses.</p>
                            )}
                            <span className='my-2 w-full h-[1px] dark:bg-subtitle-dark/50 bg-subtitle-light/60'></span>
                            {
                                selectedAdForDisplay && (
                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => setSlip(true)}
                                                className='p-2 px-3 dark:bg-blue-700 bg-blue-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-sm hover:opacity-80 cursor-pointer'
                                                disabled={!currUnit} // Disable if no unit selected
                                            >
                                                Download Slip
                                            </button>
                                            <button
                                                onClick={saveMonthlyExpenses} // New Save button
                                                className='p-2 px-3 dark:bg-green-700 bg-green-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-sm hover:opacity-80 cursor-pointer'
                                                disabled={!currUnit} // Disable if no unit selected
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <p className='font-bold'>Total: {totalExpense} TK</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/*Previous Expenses*/}
                    <div className="flex flex-col justify-start col-start-1 row-start-3 col-span-2 row-span-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-3 dark:bg-card-dark bg-card-light shadow-sm border-1 border-subtitle-dark/20 rounded-2xl sm:p-4 p-2">
                        <div className="w-full">
                            <h3 className="mb-2 sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Previous Expenses</h3>
                            <div className="w-full sm:p-4 p-2 flex flex-col gap-2 dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light rounded-xl">
                                <h3 className="sm:text-xl text-lg font-medium">
                                    {currTitle ? `Records for ${currTitle}` : "Select a unit"}
                                </h3>

                                <span className='my-2 w-full h-[1px] bg-subtitle-dark/50'></span>

                                {selectedAdForDisplay && selectedAdForDisplay.monthlyExpenses && selectedAdForDisplay.monthlyExpenses.length > 0 ? (
                                    <div className='flex flex-col gap-1 overflow-y-auto max-h-96'> {/* Added overflow-y-auto for scrollable list */}
                                        <div className='font-semibold py-1 grid grid-cols-[3.5fr_2fr_2fr_2fr_2.5fr_2fr_3fr_3fr_1.5fr] sm:text-sm text-[10px]'>
                                            <p>Month</p>
                                            <p>Unit</p>
                                            <p>Water</p>
                                            <p>Trash</p>
                                            <p>Garage</p>
                                            <p>Gas</p>
                                            <p>Elec</p>
                                            <p>Total</p>
                                        </div>
                                        {selectedAdForDisplay.monthlyExpenses.map((expense) => (
                                            <div key={expense._id || expense.month} className='bg-subtitle-dark/10 py-1 grid grid-cols-[3.5fr_2fr_2fr_2fr_2.5fr_2fr_3fr_3fr_1.5fr] items-center sm:text-sm text-[10px]'>
                                                <p>{expense.month}</p>
                                                <p>{selectedAdForDisplay.price}</p> {/* Unit bill is from ad.price */}
                                                <p>{expense.waterBill}</p>
                                                <p>{expense.trashBill}</p>
                                                <p>{expense.garageBill}</p>
                                                <p>{expense.gasBill}</p> {/* Changed to gasBill */}
                                                <p>{expense.electricityBill}</p>
                                                <p>{expense.totalBill}</p>
                                                <button
                                                    onClick={() => deleteMonthlyExpense(expense._id)}
                                                    className='text-red-400 hover:text-red-600 transition-colors duration-200 flex justify-end'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 p-1">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-red-500">No previous monthly expenses found.</p>
                                )}

                                <span className='my-2 w-full h-[1px] bg-subtitle-dark/50'></span>

                                {selectedAdForDisplay && selectedAdForDisplay.monthlyExpenses && selectedAdForDisplay.monthlyExpenses.length > 0 && (
                                    <>
                                        <div className='flex gap-2 items-center uppercase sm:text-lg text-sm'>
                                            <button
                                                onClick={() => setPreviousSlip(true)}
                                                className='p-2 px-3 dark:bg-blue-700 bg-blue-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-sm hover:opacity-80 cursor-pointer'
                                                disabled={!currUnit} // Disable if no unit selected
                                            >
                                                Download Slip
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Expense Slip Modal */}
            <AnimatePresence>
                {slip && selectedAdForDisplay && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm flex flex-col gap-4 items-center justify-center p-4">
                        <ExpenseSlip
                            title={currTitle}
                            month={selectedMonth}
                            slip={slip}
                            setSlip={setSlip}
                            items={(() => {
                                const items = [];
                                if (expenses.unit?.isChecked)
                                    items.push({
                                        name: language === 'en' ? 'House Rent' : 'বাসা ভাড়া',
                                        price: selectedAdForDisplay.price || 0,
                                    });
                                if (expenses.water?.isChecked)
                                    items.push({
                                        name: language === 'en' ? 'Water Bill' : 'পানি বিল',
                                        price: selectedAdForDisplay.waterBill || 0,
                                    });
                                if (expenses.garbage?.isChecked)
                                    items.push({
                                        name: language === 'en' ? 'Garbage Bill' : 'ময়লা বিল',
                                        price: selectedAdForDisplay.trashBill || 0,
                                    });
                                if (expenses.garage?.isChecked)
                                    items.push({
                                        name: language === 'en' ? 'Garage Bill' : 'গ্যারেজ বিল',
                                        price: selectedAdForDisplay.garageBill || 0,
                                    });
                                if (expenses.gas?.isChecked)
                                    items.push({
                                        name: language === 'en' ? 'Gas Bill' : 'গ্যাস বিল',
                                        price: selectedAdForDisplay.gasBill || 0,
                                    });
                                if (expenses.electricity?.isChecked && expenses.electricity.quantity)
                                    items.push({
                                        name: language === 'en' ? 'Electricity Bill' : 'বিদ্যুৎ বিল',
                                        price: expenses.electricity.quantity * selectedAdForDisplay.electricityBill,
                                        unit: `(${defaultBills.electricityBill} x ${expenses.electricity.quantity } ${language === 'en' ? 'units' : 'ইউনিট'
                                            })`,
                                    });

                                return items;
                            })()}
                            total={totalExpense}
                            language={language}
                            setLanguage={setLanguage}
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Previous Expense Slip Modal */}
            <AnimatePresence>
                {previousSlip && selectedAdForDisplay && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm overflow-scroll p-4">
                        <PreviousExpenseSlip
                            title={currTitle}
                            slip={previousSlip}
                            setSlip={setPreviousSlip}
                            records={selectedAdForDisplay.monthlyExpenses || []}
                            language={language}
                            setLanguage={setLanguage}
                            electricityUnit={defaultBills.electricityBill}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Expense