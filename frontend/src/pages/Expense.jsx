import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ExpenseSlip from '../components/ExpenseSlip';
import { AnimatePresence, motion } from 'framer-motion';
import axios from "axios";

const Expense = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [currUnit, setCurrUnit] = useState("");
    const [currTitle, setCurrTitle] = useState("");
    const [expenses, setExpenses] = useState({}); // State to manage checkbox and quantity for current month's calculation
    const [totalExpense, setTotalExpense] = useState(0); // State for total calculated expense
    const [slip, setSlip] = useState(false); // State to control the modal visibility

    const {
        ads,
        toast,
        toggleRefreshAds,
    } = useOutletContext();

    const currentDate = new Date();
    const currentMonthYear = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

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
                currentTotal += (expenses.electricity.quantity * 9); // Assuming 9TK per unit
            }
        }
        setTotalExpense(currentTotal);
    };

    useEffect(() => {
        calculateTotal();
    }, [expenses, currUnit, ads]); // Depend on ads as well, in case they load later or update

    useEffect(() => {
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
        } else {
            setCurrTitle("");
            setExpenses({}); // Clear expenses if "Default" is selected
        }
    }, [currUnit, ads]);

    const onChangeUnit = (e) => {
        setCurrUnit(e.target.value);
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
            month: currentMonthYear,
            waterBill: expenses.water?.isChecked ? (selectedAd.waterBill || 0) : 0,
            gasBill: expenses.gas?.isChecked ? (selectedAd.gasBill || 0) : 0,
            trashBill: expenses.garbage?.isChecked ? (selectedAd.trashBill || 0) : 0,
            garageBill: expenses.garage?.isChecked ? (selectedAd.garageBill || 0) : 0,
            electricityBill: expenses.electricity?.isChecked ? (expenses.electricity.quantity * 9) : 0,
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
            toast.warn("No expenses selected to save for this month.");
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

    const selectedAdForDisplay = ads.find(ad => ad._id === currUnit);

    return (
        <div className="min-h-screen dark:bg-bg-dark bg-bg-light">
            <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8">
                <h2 className="text-4xl sm:text-5xl font-neueplak-black sm:mb-5 mt-18 mb-8 dark:text-title-dark text-title-light">Expenses Tracker</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 grid-rows-[0fr_2fr] md:grid-rows-[1fr_3fr] gap-2 sm:gap-4">
                    {/*Calculate Expenses*/}
                    <div className="col-start-1 row-start-2 col-span-2 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-3 dark:bg-card-dark bg-card-light shadow-sm border-1 border-subtitle-dark/20 rounded-2xl sm:p-4 p-2 flex flex-col">
                        <h3 className="mb-2 sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Select unit</h3>
                        <div className='mb-5 relative'>
                            <select
                                className='w-full p-3 py-2 sm:text-2xl text-xl rounded-xl dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light appearance-none'
                                onChange={onChangeUnit}
                                name="unit"
                                id="unit"
                                value={currUnit}
                            >
                                <option value="">Default</option>
                                {ads.map((ad) => (
                                    <option key={ad._id} value={ad._id}>
                                        {ad.unitId}
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
                        <h3 className="mb-2 sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Expenses</h3>
                        <div className="w-full sm:p-4 p-2 flex flex-col gap-2 dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light rounded-xl" >
                            <h3 className="sm:text-xl text-lg font-medium">
                                {currTitle ? `${currTitle} (${currentMonthYear})` : "Select a unit to calculate expenses."}
                            </h3>
                            <span className='my-2 w-full h-[1px] bg-subtitle-dark/60'></span>
                            {/*Container*/}
                            {selectedAdForDisplay && (
                                <div className='flex flex-col gap-2'>

                                    <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
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
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
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
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
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
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
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
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
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
                                                className='w-6 h-6 rounded-3xl appearance-none border-2 cursor-pointer checked:bg-blue-600 checked:border-white checked:border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-opacity-75'
                                                type="checkbox"
                                                checked={expenses.electricity?.isChecked || false}
                                                onChange={(e) => handleCheckboxChange('electricity', e.target.checked)}
                                            />
                                            <p>Electricity</p>
                                        </div>
                                        <div className='flex items-center justify-between gap-2'>
                                            <input
                                                className='p-1 w-20 border-1 text-center rounded-lg bg-title-dark dark:bg-title-light text-subtitle-light dark:text-subtitle-dark' // Added styles for better visibility
                                                type="number"
                                                min="0" // Prevent negative quantities
                                                value={expenses.electricity?.quantity || ''}
                                                onChange={(e) => handleQuantityChange('electricity', e.target.value)}
                                                disabled={!expenses.electricity?.isChecked} // Disable if not checked
                                            />
                                            <span>x</span>
                                            <p>9 TK</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className='my-2 w-full h-[1px] bg-subtitle-dark/60'></span>
                            <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => setSlip(true)}
                                        className='p-2 px-3 dark:bg-blue-700 bg-blue-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-xs hover:opacity-80 cursor-pointer'
                                        disabled={!currUnit} // Disable if no unit selected
                                    >
                                        Payment Slip
                                    </button>
                                    <button
                                        onClick={saveMonthlyExpenses} // New Save button
                                        className='p-2 px-3 dark:bg-green-700 bg-green-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-xs hover:opacity-80 cursor-pointer'
                                        disabled={!currUnit} // Disable if no unit selected
                                    >
                                        Save
                                    </button>
                                </div>
                                <p className='font-bold'>Total: {totalExpense} TK</p>
                            </div>
                        </div>
                    </div>

                    {/*Previous Expenses*/}
                    <div className="flex flex-col justify-start col-start-1 row-start-3 col-span-2 row-span-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-3 dark:bg-card-dark bg-card-light shadow-sm border-1 border-subtitle-dark/20 rounded-2xl sm:p-4 p-2">
                        <div className="w-full">
                            <h3 className="mb-2 sm:text-3xl text-2xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Previous Expenses</h3>
                            <div className="w-full sm:p-4 p-2 flex flex-col gap-2 dark:bg-bg-dark bg-bg-light dark:text-subtitle-dark text-subtitle-light rounded-xl">
                                <h3 className="sm:text-xl text-lg font-medium">
                                    {currTitle ? `Records for ${currTitle}` : "Select a unit to view previous expenses."}
                                </h3>

                                <span className='my-2 w-full h-[1px] bg-subtitle-dark/60'></span>

                                {selectedAdForDisplay && selectedAdForDisplay.monthlyExpenses && selectedAdForDisplay.monthlyExpenses.length > 0 ? (
                                    <div className='flex flex-col gap-1 overflow-y-auto max-h-96'> {/* Added overflow-y-auto for scrollable list */}
                                        <div className='font-semibold py-1 grid grid-cols-[2.5fr_2fr_2fr_2fr_2.5fr_2fr_2fr_2fr] sm:text-sm text-xs'>
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
                                            <div key={expense._id || expense.month} className='bg-subtitle-dark/10 py-1 grid grid-cols-[2.5fr_2fr_2fr_2fr_2.5fr_2fr_2fr_2fr] sm:text-sm text-xs'>
                                                <p>{expense.month}</p>
                                                <p>{selectedAdForDisplay.price}</p> {/* Unit bill is from ad.price */}
                                                <p>{expense.waterBill}</p>
                                                <p>{expense.trashBill}</p>
                                                <p>{expense.garageBill}</p>
                                                <p>{expense.gasBill}</p> {/* Changed to gasBill */}
                                                <p>{expense.electricityBill}</p>
                                                <p>{expense.totalBill}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center dark:text-subtitle-dark/40 text-subtitle-light/40">No previous monthly expenses found.</p>
                                )}

                                <span className='my-2 w-full h-[1px] bg-subtitle-dark/60'></span>

                                {selectedAdForDisplay && selectedAdForDisplay.monthlyExpenses && selectedAdForDisplay.monthlyExpenses.length > 0 && (
                                    <>
                                        <div className='flex justify-between items-center uppercase sm:text-lg text-sm'>
                                            <button
                                                onClick={() => toast.info("Download functionality coming soon!")}
                                                className='p-2 px-3 dark:bg-blue-700 bg-blue-500 dark:text-white text-white rounded-md font-semibold sm:text-lg text-xs hover:opacity-80 cursor-pointer'>
                                                Download
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
                            month={currentMonthYear}
                            slip={slip}
                            setSlip={setSlip}
                            items={(() => {
                                const items = [];
                                if (expenses.unit?.isChecked) items.push({ name: 'বাসা ভাড়া', price: selectedAdForDisplay.price || 0 });
                                if (expenses.water?.isChecked) items.push({ name: 'পানি বিল', price: selectedAdForDisplay.waterBill || 0 }); // Changed to waterBill
                                if (expenses.garbage?.isChecked) items.push({ name: 'ময়লা বিল', price: selectedAdForDisplay.trashBill || 0 }); // Changed to trashBill
                                if (expenses.garage?.isChecked) items.push({ name: 'গ্যারেজ বিল', price: selectedAdForDisplay.garageBill || 0 }); // Changed to garageBill
                                if (expenses.gas?.isChecked) items.push({ name: 'গ্যাস বিল', price: selectedAdForDisplay.gasBill || 0 }); // Changed to gasBill
                                if (expenses.electricity?.isChecked && expenses.electricity.quantity)
                                    items.push({ name: 'বিদ্যুৎ বিল', price: expenses.electricity.quantity * 9, unit: `(${expenses.electricity.quantity} units)` });

                                return items;
                            })()}
                            total={totalExpense}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Expense