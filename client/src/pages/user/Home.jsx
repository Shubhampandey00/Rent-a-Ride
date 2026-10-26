import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaMapMarkerAlt, FaRegClock, FaShieldAlt, FaStar } from "react-icons/fa";
import { MdEventSeat, MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import heroCar from "../../Assets/homepage_3cars.png";
import roadCar from "../../Assets/homepage cars.jpg";
import fallbackCarOne from "../../Assets/vehicleModel1.png";
import fallbackCarTwo from "../../Assets/vehicleModel3.png";
import fallbackCarThree from "../../Assets/vehicleModel5.png";
import CarSearch from "./CarSearch";
import Footers from "../../components/Footer";
import { setIsSweetAlert, signOut } from "../../redux/user/userSlice";
import { setVehicleDetail } from "../../redux/user/listAllVehicleSlice";

const categories = ["All vehicles", "SUV", "Sedan", "Hatchback"];
const fallbackVehicleImages = [fallbackCarOne, fallbackCarTwo, fallbackCarThree];
const testimonials = [
  ["Ananya Mehta", "Weekend traveller", "The whole experience felt effortless. The car was spotless and ready exactly when promised."],
  ["Rohan Kapoor", "Business customer", "Transparent pricing, a great fleet, and a genuinely helpful support team."],
  ["Ishita Shah", "Road tripper", "Booking took minutes and the SUV handled our road trip beautifully."],
];

function Home() {
  const bookingRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSweetAlert } = useSelector((state) => state.user);
  const [vehicles, setVehicles] = useState([]);
  const [category, setCategory] = useState("All vehicles");

  useEffect(() => {
    fetch("/api/user/listAllVehicles")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setVehicles(data.filter((vehicle) => vehicle.isDeleted === "false" && vehicle.isAdminApproved)))
      .catch((error) => console.error("Unable to load featured vehicles", error));
  }, []);

  useEffect(() => {
    if (!isSweetAlert) return;
    Swal.fire({ title: "Booking confirmed", text: "Your vehicle has been booked successfully.", icon: "success", confirmButtonColor: "#22c55e" }).then(() => dispatch(setIsSweetAlert(false)));
  }, [dispatch, isSweetAlert]);

  const featuredVehicles = useMemo(() => {
    const filtered = category === "All vehicles" ? vehicles : vehicles.filter((vehicle) => vehicle.car_type?.toLowerCase() === category.toLowerCase());
    return filtered.slice(0, 3);
  }, [category, vehicles]);

  const showVehicle = async (id) => {
    try {
      const response = await fetch("/api/user/showVehicleDetails", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ id }) });
      const data = await response.json();
      if (data.statusCode === 401 || data.statusCode === 403) return dispatch(signOut());
      dispatch(setVehicleDetail(data));
      navigate("/vehicleDetails");
    } catch (error) { console.error("Unable to open vehicle", error); }
  };

  return <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#06111f] dark:text-white">
    <main>
      <section className="relative overflow-hidden bg-[#06111f] text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.18),transparent_30%),linear-gradient(120deg,#06111f,#0d1d2d)]" /><div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-24 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}><p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Drive your way</p><h1 className="text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">The right car.<br /><span className="text-emerald-400">Every journey.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">Premium cars, transparent pricing, and a seamless rental experience built around your plans.</p><div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-emerald-400 px-6 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300">Explore cars <FaArrowRight /></button><button type="button" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-12 items-center rounded-md border border-white/20 px-6 font-semibold transition hover:border-emerald-400 hover:text-emerald-300">How it works</button></div><div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300"><span className="flex items-center gap-2"><FaCheck className="text-emerald-400" /> No hidden fees</span><span className="flex items-center gap-2"><FaCheck className="text-emerald-400" /> Flexible pickup</span></div></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex justify-center lg:justify-end"><img src={heroCar} alt="Premium car available to rent" className="w-full max-w-2xl object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]" /></motion.div>
      </div></section>

      <section ref={bookingRef} className="relative z-20 mx-auto -mt-8 max-w-6xl px-5 sm:px-8 lg:px-12"><div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#101f30] sm:p-8"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Find your ride</p><h2 className="mt-1 text-2xl font-bold">Where are you going?</h2></div><p className="text-sm text-slate-500 dark:text-slate-400">Choose dates and locations to see availability.</p></div><CarSearch /></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Our fleet</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Ready for the road</h2></div><button type="button" onClick={() => navigate("/vehicles")} className="inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-500">View all vehicles <FaArrowRight /></button></div><div className="mt-7 flex flex-wrap gap-2">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item ? "border-emerald-500 bg-emerald-500 text-slate-950" : "border-slate-200 text-slate-600 hover:border-emerald-400 dark:border-white/10 dark:text-slate-300"}`}>{item}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featuredVehicles.map((vehicle, index) => <motion.article key={vehicle._id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-[#101f30]"><div className="relative flex h-56 items-center justify-center bg-slate-100 p-5 dark:bg-[#17283a]"><img src={vehicle.image?.[0] || fallbackVehicleImages[index % fallbackVehicleImages.length]} alt={vehicle.name || vehicle.model || "Rental vehicle"} className="h-full w-full object-contain transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold capitalize text-slate-700">{vehicle.car_type || "Car"}</span></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-bold capitalize">{vehicle.name || vehicle.model || "Premium vehicle"}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{vehicle.company || "Rent a Ride fleet"}</p></div><p className="text-right text-lg font-bold text-emerald-600">₹{vehicle.price || "--"}<span className="block text-xs font-medium text-slate-400">per day</span></p></div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400"><span className="flex items-center gap-1.5"><MdSettings /> {vehicle.transmition || "Auto"}</span><span className="flex items-center gap-1.5"><MdEventSeat /> {vehicle.seats || 5} seats</span><span className="flex items-center gap-1.5"><FaRegClock /> Flexible</span></div><button type="button" onClick={() => showVehicle(vehicle._id)} className="mt-5 flex min-h-11 w-full items-center justify-center rounded-md bg-slate-950 font-bold text-white transition hover:bg-emerald-500 hover:text-slate-950 dark:bg-white dark:text-slate-950">View details</button></div></motion.article>)}{!featuredVehicles.length && <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-white/20 dark:text-slate-400 md:col-span-2 lg:col-span-3">Our featured fleet will appear here once vehicles are available.</div>}</div></section>

      <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b1928]"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div className="overflow-hidden rounded-lg"><img src={roadCar} alt="Car ready for a road trip" className="h-72 w-full object-cover transition duration-500 hover:scale-105" /></div><div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">The Rent a Ride difference</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Designed around your time.</h2><div className="mt-8 grid gap-6 sm:grid-cols-3"><div><FaShieldAlt className="text-2xl text-emerald-500" /><h3 className="mt-3 font-bold">Trusted quality</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Every car is inspected before it reaches you.</p></div><div><FaMapMarkerAlt className="text-2xl text-emerald-500" /><h3 className="mt-3 font-bold">Easy pickup</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Choose locations that fit your itinerary.</p></div><div><FaRegClock className="text-2xl text-emerald-500" /><h3 className="mt-3 font-bold">Flexible plans</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Clear terms from booking to return.</p></div></div></div></div></section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">How it works</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Three steps to your next drive</h2></div><div className="mt-12 grid gap-8 md:grid-cols-3">{[["01", "Choose your car", "Browse our collection and find the right fit for your trip."], ["02", "Set your dates", "Tell us where and when. We will show you what is available."], ["03", "Enjoy the drive", "Pick up your car and make the most of every mile."]].map(([number, title, copy]) => <div key={number} className="border-l-2 border-emerald-500 pl-6"><span className="text-sm font-bold text-emerald-500">{number}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy}</p></div>)}</div></section>

      <section className="bg-[#06111f] text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Customer stories</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">Good drives speak for themselves.</h2></div><div className="flex items-center gap-2 text-emerald-400"><FaStar /><span className="font-bold text-white">4.9/5</span><span className="text-sm text-slate-400">from our renters</span></div></div><div className="mt-10 grid gap-5 md:grid-cols-3">{testimonials.map(([name, role, quote]) => <blockquote key={name} className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="flex gap-1 text-emerald-400">{[1, 2, 3, 4, 5].map((star) => <FaStar key={star} size={12} />)}</div><p className="mt-5 leading-7 text-slate-200">“{quote}”</p><footer className="mt-6 text-sm"><strong>{name}</strong><span className="mt-1 block text-slate-400">{role}</span></footer></blockquote>)}</div></div></section>
    </main><Footers />
  </div>;
}

export default Home;
