import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zazmnlfmoheerplwomuf.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphem1ubGZtb2hlZXJwbHdvbXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MTIwMTksImV4cCI6MjA5MDM4ODAxOX0.n24HKxUim4YlsPRAAg5_qMqNjDpzvV02jXT4Z2vh1Bk";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Valid registration numbers ─────────────────────────────────────────────────
const VALID_REG_NUMBERS = new Set([
  "AH/MDL/25/0001","AH/MDL/25/0002","AH/MDL/25/0003","AH/MDL/25/0004",
  "AH/MDL/25/0005","AH/MDL/25/0006","AH/MDL/25/0007","AH/MDL/25/0008",
  "AH/MDL/25/0009","AH/MDL/25/0010","AH/MDL/25/0011","AH/MDL/25/0012",
  "AH/MDL/25/0013","AH/MDL/25/0014","AH/MDL/25/0015","AH/MDL/25/0016",
  "AH/MDL/25/0017","AH/MDL/25/0018","AH/MDL/25/0019","AH/MDL/25/0020",
  "AH/MDL/25/0021","AH/MDL/25/0022","AH/MDL/25/0023","AH/MDL/25/0024",
  "AH/MDL/25/0025","AH/MDL/25/0026","AH/MDL/25/0027","AH/MDL/25/0028",
  "AH/MDL/25/0029","AH/MDL/25/0030","AH/MDL/25/0031","AH/MDL/25/0032",
  "AH/MDL/25/0033","AH/MDL/25/0034","AH/MDL/25/0035","AH/MDL/25/0036",
  "AH/MDL/25/0037","AH/MDL/25/0038","AH/MDL/25/0040","AH/MDL/25/0041",
  "AH/MDL/25/0042","AH/MDL/25/0043","AH/MDL/25/0044","AH/MDL/25/0045",
  "AH/MDL/25/0046","AH/MDL/25/0047","AH/MDL/25/0048","AH/MDL/25/0049",
  "AH/MDL/25/0050","AH/MDL/25/0051","AH/MDL/25/0052","AH/MDL/25/0053",
  "AH/MDL/25/0054","AH/MDL/25/0055","AH/MDL/25/0056","AH/MDL/25/0058",
  "AH/MDL/25/0059","AH/MDL/25/0060","AH/MDL/25/0061","AH/MDL/25/0062",
  "AH/MDL/25/0063","AH/MDL/25/0064","AH/MDL/25/0065","AH/MDL/25/0066",
  "AH/MDL/25/0067","AH/MDL/25/0068","AH/MDL/25/0069","AH/MDL/25/0070",
  "AH/MDL/25/0071","AH/MDL/25/0072","AH/MDL/25/0073","AH/MDL/25/0074",
  "AH/MDL/25/0075","AH/MDL/25/0076","AH/MDL/25/0077","AH/MDL/25/0078",
  "AH/MDL/25/0079","AH/MDL/25/0080","AH/MDL/25/0081","AH/MDL/25/0082",
  "AH/MDL/25/0083","AH/MDL/25/0084","AH/MDL/25/0085","AH/MDL/25/0086",
  "AH/MDL/25/0087","AH/MDL/25/0088","AH/MDL/25/0089","AH/MDL/25/0090",
  "AH/MDL/25/0091","AH/MDL/25/0092","AH/MDL/25/0093","AH/MBL/25/0094",
  "AH/MDL/25/0096",
]);

const STUDENT_NAMES = {
  "AH/MDL/25/0001":"Osei Stephen","AH/MDL/25/0002":"Adams Stephen",
  "AH/MDL/25/0003":"Moro Kabiru","AH/MDL/25/0004":"Ayikoe Felix",
  "AH/MDL/25/0005":"Firdaus Abdul Nasir","AH/MDL/25/0006":"Anokyewaa Francisca",
  "AH/MDL/25/0007":"Bingvine Magnan Noah","AH/MDL/25/0008":"Oteng Mavis",
  "AH/MDL/25/0009":"Asamoah Omono Riis","AH/MDL/25/0010":"Ankrah Nafisatu",
  "AH/MDL/25/0011":"Mensah Samuel Edem","AH/MDL/25/0012":"Opoku Joseph Acheampong",
  "AH/MDL/25/0013":"Abekah Padmore","AH/MDL/25/0014":"Asante Derrick",
  "AH/MDL/25/0015":"Eric Ackah Blay","AH/MDL/25/0016":"Amanda Kyerewaa Biney",
  "AH/MDL/25/0017":"Frimpong Ransford","AH/MDL/25/0018":"Arthur Dominic",
  "AH/MDL/25/0019":"Boadai Louisca Amoaduwaa","AH/MDL/25/0020":"Korsah Esther",
  "AH/MDL/25/0021":"Ebenezer Bright Yeboah","AH/MDL/25/0022":"Teye Joseph Tetteh",
  "AH/MDL/25/0023":"Jennifer Adwoa Quayson","AH/MDL/25/0024":"Prince Obiri",
  "AH/MDL/25/0025":"Klohuon Adwoa Keren","AH/MDL/25/0026":"Dankyi Ramseyer",
  "AH/MDL/25/0027":"Pomaa Queenstar Yeboah","AH/MDL/25/0028":"Suuk Millicent",
  "AH/MDL/25/0029":"Asare Solomon","AH/MDL/25/0030":"Bakatu Godfred",
  "AH/MDL/25/0031":"Godfred Ntsiful","AH/MDL/25/0032":"Blisi Nafiu",
  "AH/MDL/25/0033":"Acheampong Gerrald Boateng","AH/MDL/25/0034":"Claudia Naa Akushia Antiaye",
  "AH/MDL/25/0035":"Abdul-Hamid Kamel","AH/MDL/25/0036":"Owusu Richmond",
  "AH/MDL/25/0037":"Harry Dontoh","AH/MDL/25/0038":"Osei Bernard",
  "AH/MDL/25/0040":"Adotey Benjamin","AH/MDL/25/0041":"Kelvin Nettey",
  "AH/MDL/25/0042":"Caleb Oteng Frimpong","AH/MDL/25/0043":"Agyemang Duah",
  "AH/MDL/25/0044":"Sedik Ademu Edem","AH/MDL/25/0045":"Gyamfi Rachael",
  "AH/MDL/25/0046":"Morrencia Kpoh","AH/MDL/25/0047":"Kerren Owusu Acheampong",
  "AH/MDL/25/0048":"Koranteng Kelvin","AH/MDL/25/0049":"Maanu Freda Yaa",
  "AH/MDL/25/0050":"Boadu Kwabena Wood Junior","AH/MDL/25/0051":"Alem Paul Apiligwin",
  "AH/MDL/25/0052":"Nyarko Yeboah Romeo","AH/MDL/25/0053":"Ameyaw Gayheart",
  "AH/MDL/25/0054":"Duah Agyemang Christabel","AH/MDL/25/0055":"Gifty Bortey",
  "AH/MDL/25/0056":"Doku Christopher","AH/MDL/25/0058":"Boakye Mensah Jonas",
  "AH/MDL/25/0059":"Adams Dauda","AH/MDL/25/0060":"Otis Owusu",
  "AH/MDL/25/0061":"Ansah Francisca Offeibea","AH/MDL/25/0062":"Jayom Johnson",
  "AH/MDL/25/0063":"Wilson Blessing","AH/MDL/25/0064":"Arthur Derick",
  "AH/MDL/25/0065":"Kennedy Samuel Amisah","AH/MDL/25/0066":"Ansah Kingsley Gyasi",
  "AH/MDL/25/0067":"Blay Sarah","AH/MDL/25/0068":"Barns David Junior",
  "AH/MDL/25/0069":"Eugene Graham","AH/MDL/25/0070":"Ankamaa Abena",
  "AH/MDL/25/0071":"Tawiah Benjamin Teye","AH/MDL/25/0072":"Ansah Maud Ama",
  "AH/MDL/25/0073":"Appiah-Acquah Phoebe","AH/MDL/25/0074":"Gyetuah Perez Afia Afriyie",
  "AH/MDL/25/0075":"Nartey Ernestina Ayerkide","AH/MDL/25/0076":"Amoah Gloria Araba",
  "AH/MDL/25/0077":"Anokye Benedicta Esi","AH/MDL/25/0078":"Paintsil Maame Kwentsewa",
  "AH/MDL/25/0079":"Frempong Emmanuel Nhyira","AH/MDL/25/0080":"Tawiah Mckeown Asare James",
  "AH/MDL/25/0081":"Boateng Perpetual","AH/MDL/25/0082":"Adams Sarah Efua",
  "AH/MDL/25/0083":"Anim Juliet","AH/MDL/25/0084":"Lamptey Perpetual Naakoshie",
  "AH/MDL/25/0085":"Bamuoh Sambala Miriam","AH/MDL/25/0086":"Julian Aboagye Thompson",
  "AH/MDL/25/0087":"Theodosia K. Appiah","AH/MDL/25/0088":"Amoah Glorinda Nuamah",
  "AH/MDL/25/0089":"Bonsu Abigail","AH/MDL/25/0090":"Andrew Baidoo",
  "AH/MDL/25/0091":"Nagob Godfred Makpaba","AH/MDL/25/0092":"Dawuni Bright",
  "AH/MDL/25/0093":"Millicent Dansowaa","AH/MBL/25/0094":"Ayamah Daniel Anokye",
  "AH/MDL/25/0096":"Godwin Tovor",
};

const SUPERADMIN = "AH/MDL/25/0002";
const PERMANENT_ADMINS = new Set(["AH/MDL/25/0002","AH/MDL/25/0067","AH/MDL/25/0050"]);
function getAdminTier(regNum, grantedAdmins) {
  if (regNum === SUPERADMIN) return "superadmin";
  if (PERMANENT_ADMINS.has(regNum)) return "admin";
  if (grantedAdmins?.includes(regNum)) return "admin";
  return null;
}

const CATEGORIES = [
  {id:"all",label:"All",icon:"◈"},
  {id:"general",label:"General",icon:"💬"},
  {id:"assignments",label:"Assignments",icon:"📝"},
  {id:"resources",label:"Resources",icon:"📚"},
  {id:"questions",label:"Q&A",icon:"❓"},
  {id:"projects",label:"Projects",icon:"🚀"},
];
const AVATARS = ["🦁","🐺","🦊","🐻","🦅","🐬","🦋","🐙","🦚","🐝","🐉","🦜","🦭","🐸","🦩"];
const COLORS  = ["#4f46e5","#0891b2","#059669","#d97706","#dc2626","#7c3aed","#0d9488","#ea580c"];

const getAvatar = n => { if(!n) return "🎓"; const i=n.split("").reduce((a,c)=>a+c.charCodeAt(0),0); return AVATARS[i%AVATARS.length]; };
const getColor  = n => { if(!n) return COLORS[0]; const i=n.split("").reduce((a,c)=>a+c.charCodeAt(0),0); return COLORS[i%COLORS.length]; };
function timeAgo(ts) { const d=Date.now()-new Date(ts).getTime(); if(d<60000)return"just now"; if(d<3600000)return`${Math.floor(d/60000)}m ago`; if(d<86400000)return`${Math.floor(d/3600000)}h ago`; return`${Math.floor(d/86400000)}d ago`; }
function extractMentions(text) { return [...text.matchAll(/@([\w .]+)/g)].map(m=>m[1].trim()); }
async function hashPin(pin) { const buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(pin+"cf_ucc_2025")); return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join(""); }

// Session helpers
function saveSession(s) { try { localStorage.setItem("cf_session_v4", JSON.stringify(s)); } catch {} }
function loadSession() { try { return JSON.parse(localStorage.getItem("cf_session_v4")); } catch { return null; } }
function clearSession() { try { localStorage.removeItem("cf_session_v4"); } catch {} }

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function AuthScreen({ onLogin }) {
  const [step, setStep] = useState("reg");
  const [regNum, setRegNum] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [existingAcct, setExistingAcct] = useState(null);

  const norm = v => v.trim().toUpperCase();

  const handleReg = async () => {
    setError("");
    const reg = norm(regNum);
    if (!VALID_REG_NUMBERS.has(reg)) { setError("Registration number not found. Check and try again."); return; }
    setLoading(true);
    const { data } = await sb.from("accounts").select("*").eq("reg_num", reg).maybeSingle();
    setLoading(false);
    setRegNum(reg); setExistingAcct(data);
    setStep(data ? "login" : "newPw");
  };

  const handleNewPw = () => {
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setStep("chooseName");
  };

  const handleChooseName = async () => {
    setError("");
    const name = displayName.trim();
    if (name.length < 2) { setError("Display name must be at least 2 characters."); return; }
    if (name.length > 30) { setError("Display name too long (max 30 characters)."); return; }
    setLoading(true);
    const hash = await hashPin(password);
    const { error: err } = await sb.from("accounts").insert({ reg_num: regNum, display_name: name, password_hash: hash, show_identity: false });
    setLoading(false);
    if (err) { setError("Error creating account. Please try again."); return; }
    onLogin({ regNum, displayName: name });
  };

  const handleLogin = async () => {
    setError(""); setLoading(true);
    const hash = await hashPin(password);
    setLoading(false);
    if (hash !== existingAcct.password_hash) { setError("Incorrect password. Please try again."); return; }
    onLogin({ regNum, displayName: existingAcct.display_name });
  };

  const inp = { width:"100%",background:"#1e2130",color:"#e8eaf0",border:"1px solid #2a2d3e",borderRadius:10,padding:"12px 16px",fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box" };
  const btn = { width:"100%",background:"#6366f1",color:"#fff",border:"none",borderRadius:10,padding:"13px",cursor:"pointer",fontWeight:800,fontSize:15,marginTop:10 };
  const lbl = { fontSize:12,color:"#6b7080",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:6,display:"block",marginTop:16 };
  const back = to => <button onClick={()=>{setStep(to);setError("");setPassword("");setConfirm("");}} style={{background:"none",border:"none",color:"#6366f1",cursor:"pointer",fontSize:13,fontWeight:700,padding:"0 0 16px",display:"flex",alignItems:"center",gap:4}}>← Back</button>;

  return (
    <div style={{minHeight:"100vh",background:"#0f1117",display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <div style={{width:"100%",maxWidth:430}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:10}}>🎓</div>
          <h1 style={{margin:0,fontSize:28,fontWeight:900,color:"#e8eaf0",letterSpacing:"-0.04em"}}>ClassForum</h1>
          <p style={{margin:"6px 0 0",color:"#6b7080",fontSize:13}}>University of Cape Coast · Dominase Campus</p>
          <p style={{margin:"2px 0 0",color:"#4a4d60",fontSize:12}}>AH/MDL/25 — Closed Student Forum</p>
        </div>
        <div style={{background:"#1a1d27",borderRadius:18,border:"1px solid #2a2d3e",padding:"28px 28px 24px",boxShadow:"0 12px 48px #0008"}}>

          {step==="reg" && <>
            <h2 style={{margin:"0 0 6px",color:"#e8eaf0",fontSize:19,fontWeight:800}}>Sign in to your forum</h2>
            <p style={{margin:"0 0 20px",color:"#6b7080",fontSize:13,lineHeight:1.6}}>Enter your student registration number to verify your enrollment.</p>
            <label style={lbl}>Registration Number</label>
            <input value={regNum} onChange={e=>setRegNum(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleReg()} placeholder="e.g. AH/MDL/25/0001" style={inp} autoFocus/>
            {error && <p style={{color:"#ef4444",fontSize:13,margin:"10px 0 0"}}>{error}</p>}
            <button onClick={handleReg} disabled={loading} style={{...btn,opacity:loading?0.6:1}}>{loading?"Verifying...":"Continue →"}</button>
          </>}

          {step==="newPw" && <>
            {back("reg")}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,padding:"12px 14px",background:"#13151f",borderRadius:10,border:"1px solid #2a2d3e"}}>
              <span style={{fontSize:24}}>🎉</span>
              <div><div style={{fontSize:13,color:"#e8eaf0",fontWeight:700}}>Welcome, {STUDENT_NAMES[regNum]||regNum}!</div><div style={{fontSize:12,color:"#6366f1",fontWeight:600,marginTop:2}}>{regNum}</div></div>
            </div>
            <p style={{margin:"0 0 4px",color:"#b0b4c8",fontSize:13,lineHeight:1.6}}>Create a password to secure your account.</p>
            <label style={lbl}>Choose a Password</label>
            <div style={{position:"relative"}}>
              <input value={password} onChange={e=>setPassword(e.target.value)} type={showPw?"text":"password"} placeholder="Min. 6 characters" style={inp}/>
              <button onClick={()=>setShowPw(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#6b7080",cursor:"pointer",fontSize:16}}>{showPw?"🙈":"👁️"}</button>
            </div>
            <label style={lbl}>Confirm Password</label>
            <input value={confirm} onChange={e=>setConfirm(e.target.value)} type={showPw?"text":"password"} onKeyDown={e=>e.key==="Enter"&&handleNewPw()} placeholder="Re-enter password" style={inp}/>
            {error && <p style={{color:"#ef4444",fontSize:13,margin:"10px 0 0"}}>{error}</p>}
            <button onClick={handleNewPw} style={btn}>Next →</button>
          </>}

          {step==="chooseName" && <>
            {back("newPw")}
            <h2 style={{margin:"0 0 6px",color:"#e8eaf0",fontSize:19,fontWeight:800}}>Choose your display name ✨</h2>
            <p style={{margin:"0 0 20px",color:"#6b7080",fontSize:13,lineHeight:1.6}}>This is what your classmates will see on your posts.</p>
            <label style={{...lbl,marginTop:0}}>Display Name</label>
            <input value={displayName} onChange={e=>setDisplayName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleChooseName()} placeholder="e.g. Abena A." style={inp} autoFocus/>
            {displayName.trim().length>=2 && (
              <div style={{display:"flex",alignItems:"center",gap:12,marginTop:14,padding:"12px 14px",background:"#13151f",borderRadius:10,border:"1px solid #2a2d3e"}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:getColor(displayName.trim()),display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{getAvatar(displayName.trim())}</div>
                <div><div style={{fontWeight:700,color:"#e8eaf0",fontSize:15}}>{displayName.trim()}</div><div style={{fontSize:11,color:"#6b7080",marginTop:1}}>{regNum}</div></div>
                <span style={{marginLeft:"auto",fontSize:11,color:"#059669",fontWeight:700}}>✓ Looks good</span>
              </div>
            )}
            {error && <p style={{color:"#ef4444",fontSize:13,margin:"10px 0 0"}}>{error}</p>}
            <button onClick={handleChooseName} disabled={loading} style={{...btn,opacity:loading?0.6:1}}>{loading?"Creating account...":"Enter Forum 🎉"}</button>
          </>}

          {step==="login" && <>
            {back("reg")}
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22,padding:"14px 16px",background:"#13151f",borderRadius:12,border:"1px solid #2a2d3e"}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:getColor(existingAcct?.display_name||""),display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{getAvatar(existingAcct?.display_name||"")}</div>
              <div>
                <div style={{fontWeight:800,color:"#e8eaf0",fontSize:16}}>{existingAcct?.display_name}</div>
                <div style={{fontSize:12,color:"#6b7080",marginTop:1}}>{STUDENT_NAMES[regNum]||""}</div>
                <div style={{fontSize:11,color:"#6366f1",marginTop:1,fontWeight:600}}>{regNum}</div>
              </div>
            </div>
            <label style={{...lbl,marginTop:0}}>Password</label>
            <div style={{position:"relative"}}>
              <input value={password} onChange={e=>setPassword(e.target.value)} type={showPw?"text":"password"} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Enter your password" style={inp} autoFocus/>
              <button onClick={()=>setShowPw(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#6b7080",cursor:"pointer",fontSize:16}}>{showPw?"🙈":"👁️"}</button>
            </div>
            {error && <p style={{color:"#ef4444",fontSize:13,margin:"10px 0 0"}}>{error}</p>}
            <button onClick={handleLogin} disabled={loading} style={{...btn,opacity:loading?0.6:1}}>{loading?"Verifying...":"Sign In →"}</button>
          </>}

        </div>
        <p style={{textAlign:"center",color:"#2a2d3e",fontSize:12,marginTop:20}}>Access restricted to enrolled AH/MDL/25 students only.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// UI ATOMS
// ═══════════════════════════════════════════════════════════════════════════════
function Avatar({name,size=36}){const c=getColor(name);return <div style={{width:size,height:size,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.5,flexShrink:0,boxShadow:`0 0 0 2px ${c}33`}}>{getAvatar(name)}</div>;}
function Badge({label}){const cat=CATEGORIES.find(c=>c.id===label);return <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"2px 8px",borderRadius:4,background:"var(--badge-bg)",color:"var(--accent)",border:"1px solid var(--accent-dim)"}}>{cat?.icon} {cat?.label||label}</span>;}
function UpvoteBtn({count,active,onClick}){return <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,background:active?"var(--accent)":"var(--btn-bg)",color:active?"#fff":"var(--text-muted)",border:`1px solid ${active?"var(--accent)":"var(--border)"}`,borderRadius:20,padding:"4px 12px",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all 0.15s"}}>▲ {count}</button>;}
function NotifBell({count,onOpen}){return <button onClick={onOpen} style={{position:"relative",background:"var(--btn-bg)",border:"1px solid var(--border)",borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:18,lineHeight:1}}>🔔{count>0&&<span style={{position:"absolute",top:-5,right:-5,background:"#ef4444",color:"#fff",borderRadius:10,fontSize:10,fontWeight:800,padding:"1px 5px",minWidth:16,textAlign:"center",lineHeight:"16px"}}>{count>9?"9+":count}</span>}</button>;}

// ── Notifications Panel ───────────────────────────────────────────────────────
function NotifPanel({notifs,onClose,onMarkAll,onMarkOne}){
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",justifyContent:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(360px, 100vw)",maxWidth:"100vw",height:"100vh",background:"var(--card)",borderLeft:"1px solid var(--border)",display:"flex",flexDirection:"column",boxShadow:"-8px 0 32px #0004"}}>
        <div style={{padding:"18px 20px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontWeight:800,fontSize:16,color:"var(--text)"}}>🔔 Notifications</span>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={onMarkAll} style={{fontSize:12,color:"var(--accent)",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Mark all read</button>
            <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--text-muted)"}}>×</button>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {notifs.length===0&&<div style={{padding:40,textAlign:"center",color:"var(--text-muted)",fontSize:14}}>No notifications yet 🎉</div>}
          {[...notifs].reverse().map(n=>(
            <div key={n.id} onClick={()=>onMarkOne(n.id)} style={{padding:"14px 20px",borderBottom:"1px solid var(--border)",background:n.read?"transparent":"var(--accent-dim)",cursor:"pointer",display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:18,flexShrink:0}}>{n.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:13,color:"var(--text)",lineHeight:1.5}}>{n.message}</div><div style={{fontSize:11,color:"var(--text-muted)",marginTop:3}}>{timeAgo(n.created_at)}</div></div>
              {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:"var(--accent)",flexShrink:0,marginTop:4}}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Announcements ─────────────────────────────────────────────────────────────
function AnnouncementsSection({announcements,isAdmin,onAdd,onDelete}){
  const [expanded,setExpanded]=useState(true);
  const [showForm,setShowForm]=useState(false);
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [important,setImportant]=useState(false);
  const submit=()=>{if(!title.trim()||!body.trim())return;onAdd({title:title.trim(),body:body.trim(),important});setTitle("");setBody("");setImportant(false);setShowForm(false);};
  if(announcements.length===0&&!isAdmin)return null;
  return(
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{height:2,flex:1,background:"var(--accent-dim)"}}/>
        <button onClick={()=>setExpanded(e=>!e)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"var(--accent)",fontWeight:700,fontSize:13,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>
          📌 PINNED ANNOUNCEMENTS {announcements.length>0&&`(${announcements.length})`} {expanded?"▲":"▼"}
        </button>
        <div style={{height:2,flex:1,background:"var(--accent-dim)"}}/>
        {isAdmin&&<button onClick={()=>setShowForm(s=>!s)} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:7,padding:"5px 12px",cursor:"pointer",fontWeight:700,fontSize:12}}>+ Add</button>}
      </div>
      {isAdmin&&showForm&&(
        <div style={{background:"var(--card)",border:"2px solid var(--accent)",borderRadius:12,padding:20,marginBottom:12}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Announcement title..." style={{width:"100%",marginBottom:10,background:"var(--input-bg)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 13px",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
          <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Announcement body..." rows={3} style={{width:"100%",marginBottom:10,background:"var(--input-bg)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 13px",fontSize:14,fontFamily:"inherit",resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
          <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"space-between",flexWrap:"wrap"}}>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"var(--text-secondary)",cursor:"pointer"}}><input type="checkbox" checked={important} onChange={e=>setImportant(e.target.checked)}/> Mark as important ⚠</label>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowForm(false)} style={{background:"var(--btn-bg)",color:"var(--text-muted)",border:"1px solid var(--border)",borderRadius:7,padding:"7px 16px",cursor:"pointer",fontWeight:600}}>Cancel</button>
              <button onClick={submit} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:7,padding:"7px 16px",cursor:"pointer",fontWeight:700}}>Post</button>
            </div>
          </div>
        </div>
      )}
      {expanded&&announcements.map(a=>(
        <div key={a.id} style={{background:a.important?"var(--ann-imp)":"var(--card)",border:`1px solid ${a.important?"#ef4444":"var(--border)"}`,borderLeft:`4px solid ${a.important?"#ef4444":"var(--accent)"}`,borderRadius:10,padding:"14px 16px",marginBottom:10,position:"relative"}}>
          {a.important&&<span style={{position:"absolute",top:10,right:12,fontSize:11,fontWeight:700,color:"#ef4444",background:"#ef444415",padding:"2px 8px",borderRadius:4}}>⚠ IMPORTANT</span>}
          <div style={{fontWeight:700,fontSize:15,color:"var(--text)",marginBottom:6,paddingRight:90}}>{a.title}</div>
          <div style={{fontSize:14,color:"var(--text-secondary)",lineHeight:1.6,marginBottom:10}}>{a.body}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"var(--text-muted)"}}>📌 {a.author} · {timeAgo(a.created_at)}</span>
            {isAdmin&&<button onClick={()=>onDelete(a.id)} style={{fontSize:11,color:"#ef4444",background:"none",border:"1px solid #ef444440",borderRadius:5,padding:"2px 8px",cursor:"pointer",fontWeight:600}}>Remove</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Reply Box ─────────────────────────────────────────────────────────────────
function ReplyBox({onSubmit}){
  const [text,setText]=useState("");
  return(
    <div style={{display:"flex",gap:8,marginTop:12,alignItems:"flex-start"}}>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write a reply... use @name to mention someone" rows={2}
        style={{flex:1,background:"var(--input-bg)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontSize:14,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
      <button onClick={()=>{if(text.trim()){onSubmit(text.trim());setText("");}}} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:13,alignSelf:"flex-end"}}>Post</button>
    </div>
  );
}

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({post,userRegNum,isAdmin,identityMap,onUpvote,onReply,onUpvoteReply,onPin,expanded,onToggle}){
  const isUpvoted=(post.upvotes||[]).includes(userRegNum);
  return(
    <div style={{background:"var(--card)",borderRadius:12,border:`1px solid ${post.pinned?"var(--accent)":"var(--border)"}`,borderLeft:post.pinned?"4px solid var(--accent)":undefined,padding:"16px",boxShadow:expanded?"0 4px 24px #0002":"none"}}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
        <Avatar name={post.author}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",marginBottom:4}}>
            <span style={{fontWeight:700,fontSize:14,color:getColor(post.author)}}>{post.author}</span>
            {identityMap?.[post.reg_num]&&post.reg_num&&post.reg_num!=="ADMIN"&&(
              <span style={{fontSize:11,color:"var(--text-muted)",fontWeight:500}}>{STUDENT_NAMES[post.reg_num]||""} · {post.reg_num}</span>
            )}
            <Badge label={post.category}/>
            {post.pinned&&<span style={{fontSize:11,color:"var(--accent)",fontWeight:700}}>📌 Pinned</span>}
            <span style={{fontSize:12,color:"var(--text-muted)",marginLeft:"auto"}}>{timeAgo(post.created_at)}</span>
          </div>
          <h3 onClick={onToggle} style={{margin:0,fontSize:17,fontWeight:700,color:"var(--text)",cursor:"pointer",lineHeight:1.3}}>{post.title}</h3>
        </div>
      </div>
      {expanded&&(
        <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid var(--border)"}}>
          <p style={{margin:"0 0 16px",fontSize:15,lineHeight:1.7,color:"var(--text-secondary)"}}>{post.body}</p>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            <UpvoteBtn count={(post.upvotes||[]).length} active={isUpvoted} onClick={()=>onUpvote(post.id)}/>
            <span style={{fontSize:13,color:"var(--text-muted)"}}>💬 {(post.replies||[]).length} {(post.replies||[]).length===1?"reply":"replies"}</span>
            {isAdmin&&<button onClick={()=>onPin(post.id,!post.pinned)} style={{marginLeft:"auto",fontSize:12,color:post.pinned?"#ef4444":"var(--accent)",background:"none",border:`1px solid ${post.pinned?"#ef4444":"var(--accent-dim)"}`,borderRadius:6,padding:"3px 10px",cursor:"pointer",fontWeight:600}}>{post.pinned?"📌 Unpin":"📌 Pin to top"}</button>}
          </div>
          {(post.replies||[]).length>0&&(
            <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:12}}>
              {post.replies.map(r=>(
                <div key={r.id} style={{display:"flex",gap:10,paddingLeft:16,borderLeft:"2px solid var(--accent-dim)"}}>
                  <Avatar name={r.author} size={28}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3,flexWrap:"wrap"}}>
                      <span style={{fontWeight:700,fontSize:13,color:getColor(r.author)}}>{r.author}</span>
                      {identityMap?.[r.reg_num]&&r.reg_num&&(
                        <span style={{fontSize:11,color:"var(--text-muted)",fontWeight:500}}>{STUDENT_NAMES[r.reg_num]||""} · {r.reg_num}</span>
                      )}
                      <span style={{fontSize:11,color:"var(--text-muted)"}}>{timeAgo(r.created_at)}</span>
                    </div>
                    <p style={{margin:"0 0 6px",fontSize:14,color:"var(--text-secondary)",lineHeight:1.6}}>{r.body}</p>
                    <UpvoteBtn count={(r.upvotes||[]).length} active={(r.upvotes||[]).includes(userRegNum)} onClick={()=>onUpvoteReply(post.id,r.id)}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ReplyBox onSubmit={text=>onReply(post.id,text)}/>
        </div>
      )}
      {!expanded&&(
        <div style={{display:"flex",gap:12,marginTop:10,alignItems:"center"}}>
          <UpvoteBtn count={(post.upvotes||[]).length} active={isUpvoted} onClick={()=>onUpvote(post.id)}/>
          <span style={{fontSize:13,color:"var(--text-muted)",cursor:"pointer"}} onClick={onToggle}>💬 {(post.replies||[]).length} {(post.replies||[]).length===1?"reply":"replies"} · click to expand</span>
        </div>
      )}
    </div>
  );
}

// ── New Post Modal ────────────────────────────────────────────────────────────
function NewPostModal({onClose,onSubmit}){
  const [title,setTitle]=useState("");const [body,setBody]=useState("");const [cat,setCat]=useState("general");
  const submit=()=>{if(!title.trim()||!body.trim())return;onSubmit({title:title.trim(),body:body.trim(),category:cat});onClose();};
  return(
    <div style={{position:"fixed",inset:0,background:"#000a",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}>
      <div style={{background:"var(--card)",borderRadius:16,padding:28,width:"100%",maxWidth:560,border:"1px solid var(--border)",boxShadow:"0 8px 40px #0004"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><h2 style={{margin:0,fontSize:20,color:"var(--text)"}}>New Post</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--text-muted)"}}>×</button></div>
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>{CATEGORIES.filter(c=>c.id!=="all").map(c=><button key={c.id} onClick={()=>setCat(c.id)} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${cat===c.id?"var(--accent)":"var(--border)"}`,background:cat===c.id?"var(--accent)":"var(--btn-bg)",color:cat===c.id?"#fff":"var(--text-muted)",cursor:"pointer",fontSize:13,fontWeight:600}}>{c.icon} {c.label}</button>)}</div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post title..." style={{width:"100%",marginBottom:12,background:"var(--input-bg)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 14px",fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="What's on your mind? Use @name to mention a classmate." rows={5} style={{width:"100%",marginBottom:16,background:"var(--input-bg)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 14px",fontSize:14,fontFamily:"inherit",resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10}}><button onClick={onClose} style={{background:"var(--btn-bg)",color:"var(--text-muted)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontWeight:600}}>Cancel</button><button onClick={submit} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontWeight:700,fontSize:14}}>Publish</button></div>
      </div>
    </div>
  );
}

// ── Grant Admin Panel ─────────────────────────────────────────────────────────
function GrantAdminPanel({grantedAdmins,isSuperAdmin,onGrant,onRevoke}){
  const [input,setInput]=useState("");const [msg,setMsg]=useState(null);
  const norm=v=>v.trim().toUpperCase();
  const handleGrant=()=>{const reg=norm(input);if(!VALID_REG_NUMBERS.has(reg)){setMsg({type:"err",text:"Registration number not found."});return;}if(PERMANENT_ADMINS.has(reg)){setMsg({type:"err",text:"Already a permanent admin."});return;}if(grantedAdmins.includes(reg)){setMsg({type:"err",text:"Already an admin."});return;}onGrant(reg);setMsg({type:"ok",text:`Admin granted to ${STUDENT_NAMES[reg]||reg}.`});setInput("");};
  return(
    <div style={{margin:"12px 0",padding:"14px 16px",background:"var(--input-bg)",borderRadius:10,border:"1px solid var(--border)",textAlign:"left"}}>
      <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:10}}>⚡ Admin Management</div>
      {grantedAdmins.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Granted Admins</div>{grantedAdmins.map(reg=><div key={reg} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:"var(--card)",borderRadius:7,marginBottom:5,border:"1px solid var(--border)"}}><div><span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{STUDENT_NAMES[reg]||reg}</span><span style={{fontSize:11,color:"var(--accent)",marginLeft:8,fontWeight:600}}>{reg}</span></div>{isSuperAdmin&&<button onClick={()=>{onRevoke(reg);setMsg({type:"ok",text:`Revoked from ${STUDENT_NAMES[reg]||reg}.`});}} style={{fontSize:11,color:"#ef4444",background:"none",border:"1px solid #ef444440",borderRadius:5,padding:"2px 8px",cursor:"pointer",fontWeight:600}}>Revoke</button>}</div>)}</div>}
      <div style={{fontSize:11,color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Grant Admin Rights</div>
      <div style={{display:"flex",gap:8}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleGrant()} placeholder="e.g. AH/MDL/25/0010" style={{flex:1,background:"var(--card)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:7,padding:"7px 10px",fontSize:13,fontFamily:"inherit",outline:"none"}}/><button onClick={handleGrant} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:7,padding:"7px 14px",cursor:"pointer",fontWeight:700,fontSize:13}}>Grant</button></div>
      {msg&&<div style={{marginTop:8,fontSize:12,color:msg.type==="ok"?"#059669":"#ef4444",fontWeight:600}}>{msg.type==="ok"?"✓":"✗"} {msg.text}</div>}
    </div>
  );
}

// ── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileModal({session,onClose,posts,adminTier,isSuperAdmin,grantedAdmins,onGrantAdmin,onRevokeAdmin,onLogout,showIdentity,onToggleIdentity}){
  const {displayName,regNum}=session;
  const isAdmin=adminTier!==null;
  const myPosts=posts.filter(p=>p.reg_num===regNum);
  const totalUp=myPosts.reduce((a,p)=>a+(p.upvotes||[]).length,0);
  const totalRe=myPosts.reduce((a,p)=>a+(p.replies||[]).length,0);
  return(
    <div style={{position:"fixed",inset:0,background:"#000a",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}>
      <div style={{background:"var(--card)",borderRadius:16,padding:"24px 20px",width:"100%",maxWidth:420,border:"1px solid var(--border)",textAlign:"center",position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",right:16,top:16,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--text-muted)"}}>×</button>
        <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}><Avatar name={displayName} size={72}/></div>
        <h2 style={{margin:"0 0 2px",color:"var(--text)",fontSize:22}}>{displayName}</h2>
        <p style={{margin:"0 0 2px",color:"var(--text-secondary)",fontSize:13}}>{STUDENT_NAMES[regNum]||""}</p>
        <p style={{margin:"0 0 2px",color:"var(--accent)",fontSize:11,fontWeight:700,letterSpacing:"0.06em"}}>{regNum}</p>
        <p style={{margin:"0 0 10px",color:"var(--text-muted)",fontSize:12}}>AH/MDL/25 · UCC Dominase</p>
        {adminTier==="superadmin"&&<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"linear-gradient(135deg,#7c3aed,#4f46e5)",color:"#fff",borderRadius:6,fontSize:11,fontWeight:700,padding:"3px 10px",marginBottom:8}}>⭐ SUPERADMIN</div>}
        {adminTier==="admin"&&<div style={{display:"inline-block",background:"var(--accent)",color:"#fff",borderRadius:6,fontSize:11,fontWeight:700,padding:"2px 10px",marginBottom:8}}>⚡ ADMIN</div>}
        <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:20}}>
          {[["Posts",myPosts.length],["Upvotes",totalUp],["Replies",totalRe]].map(([l,v])=><div key={l}><div style={{fontSize:26,fontWeight:800,color:"var(--accent)"}}>{v}</div><div style={{fontSize:12,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.05em"}}>{l}</div></div>)}
        </div>
        {/* Identity toggle */}
        <div style={{margin:"0 0 12px",padding:"14px 16px",background:"var(--input-bg)",borderRadius:10,border:"1px solid var(--border)",textAlign:"left"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
            <div><div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>Show my identity publicly</div><div style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>Let others see your real name & reg number</div></div>
            <button onClick={onToggleIdentity} style={{flexShrink:0,marginLeft:12,width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",background:showIdentity?"var(--accent)":"var(--border)",transition:"background 0.2s",position:"relative"}}>
              <span style={{position:"absolute",top:2,left:showIdentity?22:2,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left 0.2s",display:"block"}}/>
            </button>
          </div>
          {showIdentity?<div style={{fontSize:11,color:"var(--accent)",fontWeight:600}}>✓ Visible: {STUDENT_NAMES[regNum]||""} · {regNum}</div>:<div style={{fontSize:11,color:"var(--text-muted)"}}>Only "{displayName}" is visible to others</div>}
        </div>
        {/* Admin panel */}
        {isAdmin&&<GrantAdminPanel grantedAdmins={grantedAdmins} isSuperAdmin={isSuperAdmin} onGrant={onGrantAdmin} onRevoke={onRevokeAdmin}/>}
        <button onClick={onLogout} style={{background:"none",color:"var(--text-muted)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 22px",cursor:"pointer",fontWeight:600,fontSize:13,width:"100%",marginTop:4}}>Sign Out</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORUM APP – Supabase powered
// ═══════════════════════════════════════════════════════════════════════════════
function ForumApp({session,onLogout}){
  const {displayName,regNum}=session;
  const [darkMode,setDarkMode]=useState(true);
  const [posts,setPosts]=useState([]);
  const [announcements,setAnn]=useState([]);
  const [notifications,setNotifs]=useState([]);
  const [category,setCategory]=useState("all");
  const [search,setSearch]=useState("");
  const [expandedId,setExpandedId]=useState(null);
  const [showNewPost,setShowNewPost]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [sortBy,setSortBy]=useState("newest");
  const [adminTier,setAdminTier]=useState(null);
  const [grantedAdmins,setGrantedAdmins]=useState([]);
  const [showIdentity,setShowIdentity]=useState(false);
  const [identityMap,setIdentityMap]=useState({});
  const [showNotifs,setShowNotifs]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const isAdmin=adminTier!==null;
  const isSuperAdmin=adminTier==="superadmin";

  // ── Load all data ────────────────────────────────────────────────────────────
  useEffect(()=>{
    (async()=>{
      // Posts with replies and upvotes
      const {data:rawPosts}=await sb.from("posts").select("*, replies(*, reply_upvotes(reg_num)), post_upvotes(reg_num)").order("created_at",{ascending:false});
      // Shape data: flatten upvotes arrays
      const shaped=(rawPosts||[]).map(p=>({
        ...p,
        upvotes:(p.post_upvotes||[]).map(u=>u.reg_num),
        replies:(p.replies||[]).map(r=>({...r,upvotes:(r.reply_upvotes||[]).map(u=>u.reg_num)})),
      }));
      setPosts(shaped);

      const {data:ann}=await sb.from("announcements").select("*").order("created_at",{ascending:false});
      setAnn(ann||[]);

      const {data:notifs}=await sb.from("notifications").select("*").eq("recipient",regNum).order("created_at",{ascending:false}).limit(50);
      setNotifs(notifs||[]);

      const {data:granted}=await sb.from("granted_admins").select("reg_num");
      const grantedList=(granted||[]).map(g=>g.reg_num);
      setGrantedAdmins(grantedList);
      setAdminTier(getAdminTier(regNum,grantedList));

      const {data:acct}=await sb.from("accounts").select("show_identity").eq("reg_num",regNum).maybeSingle();
      setShowIdentity(acct?.show_identity||false);

      const {data:allAccts}=await sb.from("accounts").select("reg_num,show_identity");
      const imap={};(allAccts||[]).forEach(a=>{imap[a.reg_num]=a.show_identity;});
      setIdentityMap(imap);

      setLoaded(true);
    })();
  },[regNum]);

  // ── Realtime subscriptions ───────────────────────────────────────────────────
  useEffect(()=>{
    if(!loaded)return;

    const postsSub=sb.channel("posts-channel")
      .on("postgres_changes",{event:"*",schema:"public",table:"posts"},async()=>{
        const {data}=await sb.from("posts").select("*, replies(*, reply_upvotes(reg_num)), post_upvotes(reg_num)").order("created_at",{ascending:false});
        setPosts((data||[]).map(p=>({...p,upvotes:(p.post_upvotes||[]).map(u=>u.reg_num),replies:(p.replies||[]).map(r=>({...r,upvotes:(r.reply_upvotes||[]).map(u=>u.reg_num)}))})));
      })
      .on("postgres_changes",{event:"*",schema:"public",table:"replies"},async()=>{
        const {data}=await sb.from("posts").select("*, replies(*, reply_upvotes(reg_num)), post_upvotes(reg_num)").order("created_at",{ascending:false});
        setPosts((data||[]).map(p=>({...p,upvotes:(p.post_upvotes||[]).map(u=>u.reg_num),replies:(p.replies||[]).map(r=>({...r,upvotes:(r.reply_upvotes||[]).map(u=>u.reg_num)}))})));
      })
      .on("postgres_changes",{event:"*",schema:"public",table:"post_upvotes"},async()=>{
        const {data}=await sb.from("posts").select("*, replies(*, reply_upvotes(reg_num)), post_upvotes(reg_num)").order("created_at",{ascending:false});
        setPosts((data||[]).map(p=>({...p,upvotes:(p.post_upvotes||[]).map(u=>u.reg_num),replies:(p.replies||[]).map(r=>({...r,upvotes:(r.reply_upvotes||[]).map(u=>u.reg_num)}))})));
      })
      .subscribe();

    const annSub=sb.channel("ann-channel")
      .on("postgres_changes",{event:"*",schema:"public",table:"announcements"},async()=>{
        const {data}=await sb.from("announcements").select("*").order("created_at",{ascending:false});
        setAnn(data||[]);
      })
      .subscribe();

    const notifSub=sb.channel(`notifs-${regNum}`)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`recipient=eq.${regNum}`},(payload)=>{
        setNotifs(prev=>[payload.new,...prev]);
      })
      .subscribe();

    const identitySub=sb.channel("identity-channel")
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"accounts"},(payload)=>{
        setIdentityMap(prev=>({...prev,[payload.new.reg_num]:payload.new.show_identity}));
      })
      .subscribe();

    return()=>{
      sb.removeChannel(postsSub);
      sb.removeChannel(annSub);
      sb.removeChannel(notifSub);
      sb.removeChannel(identitySub);
    };
  },[loaded,regNum]);

  // ── Notification helper ──────────────────────────────────────────────────────
  const addNotif=useCallback(async(recipient,message,icon="🔔")=>{
    await sb.from("notifications").insert({id:`n${Date.now()}${Math.random().toString(36).slice(2)}`,recipient,message,icon,read:false});
  },[]);

  // ── Actions ──────────────────────────────────────────────────────────────────
  const addPost=async({title,body,category})=>{
    const id=`p${Date.now()}`;
    await sb.from("posts").insert({id,author:displayName,reg_num:regNum,category,title,body,pinned:false});
    const mentions=extractMentions(body);
    for(const m of mentions){ if(m!==displayName) await addNotif(m,`${displayName} mentioned you in "${title}"`,"💬"); }
  };

  const upvotePost=async(postId)=>{
    const post=posts.find(p=>p.id===postId);if(!post)return;
    const already=(post.upvotes||[]).includes(regNum);
    if(already){ await sb.from("post_upvotes").delete().eq("post_id",postId).eq("reg_num",regNum); }
    else{
      await sb.from("post_upvotes").insert({post_id:postId,reg_num:regNum});
      if(post.reg_num!==regNum) await addNotif(post.reg_num,`${displayName} upvoted your post "${post.title}"`,"▲");
    }
  };

  const addReply=async(postId,text)=>{
    const post=posts.find(p=>p.id===postId);if(!post)return;
    await sb.from("replies").insert({id:`r${Date.now()}`,post_id:postId,author:displayName,reg_num:regNum,body:text});
    if(post.reg_num!==regNum) await addNotif(post.reg_num,`${displayName} replied to your post "${post.title}"`,"💬");
    const mentions=extractMentions(text);
    for(const m of mentions){ if(m!==displayName&&m!==post.author) await addNotif(m,`${displayName} mentioned you in a reply on "${post.title}"`,"💬"); }
  };

  const upvoteReply=async(postId,replyId)=>{
    const post=posts.find(p=>p.id===postId);if(!post)return;
    const reply=(post.replies||[]).find(r=>r.id===replyId);if(!reply)return;
    const already=(reply.upvotes||[]).includes(regNum);
    if(already){ await sb.from("reply_upvotes").delete().eq("reply_id",replyId).eq("reg_num",regNum); }
    else{
      await sb.from("reply_upvotes").insert({reply_id:replyId,reg_num:regNum});
      if(reply.reg_num!==regNum) await addNotif(reply.reg_num,`${displayName} upvoted your reply on "${post.title}"`,"▲");
    }
  };

  const pinPost=async(postId,pinned)=>{ await sb.from("posts").update({pinned}).eq("id",postId); };

  const addAnn=async({title,body,important})=>{
    await sb.from("announcements").insert({id:`a${Date.now()}`,author:displayName,title,body,important});
    await addNotif("__broadcast__",`New announcement: "${title}"`,"📌");
  };
  const deleteAnn=async(id)=>{ await sb.from("announcements").delete().eq("id",id); };

  const markAllRead=async()=>{
    await sb.from("notifications").update({read:true}).eq("recipient",regNum);
    setNotifs(prev=>prev.map(n=>({...n,read:true})));
  };
  const markOneRead=async(id)=>{
    await sb.from("notifications").update({read:true}).eq("id",id);
    setNotifs(prev=>prev.map(n=>n.id===id?{...n,read:true}:n));
  };

  const handleGrantAdmin=async(targetReg)=>{
    await sb.from("granted_admins").insert({reg_num:targetReg,granted_by:regNum});
    setGrantedAdmins(prev=>[...prev,targetReg]);
  };
  const handleRevokeAdmin=async(targetReg)=>{
    if(!isSuperAdmin||PERMANENT_ADMINS.has(targetReg))return;
    await sb.from("granted_admins").delete().eq("reg_num",targetReg);
    setGrantedAdmins(prev=>prev.filter(r=>r!==targetReg));
  };

  const handleToggleIdentity=async()=>{
    const next=!showIdentity;
    await sb.from("accounts").update({show_identity:next}).eq("reg_num",regNum);
    setShowIdentity(next);
    setIdentityMap(prev=>({...prev,[regNum]:next}));
  };

  const myNotifs=notifications.filter(n=>n.recipient===regNum||n.recipient==="__broadcast__");
  const unreadCount=myNotifs.filter(n=>!n.read).length;

  let filtered=posts.filter(p=>{
    const matchCat=category==="all"||p.category===category;
    const q=search.toLowerCase();
    return matchCat&&(!q||p.title.toLowerCase().includes(q)||p.body.toLowerCase().includes(q)||p.author.toLowerCase().includes(q));
  });
  if(sortBy==="newest")filtered=[...filtered].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  else if(sortBy==="top")filtered=[...filtered].sort((a,b)=>(b.upvotes||[]).length-(a.upvotes||[]).length);
  else if(sortBy==="active")filtered=[...filtered].sort((a,b)=>(b.replies||[]).length-(a.replies||[]).length);
  filtered=[...filtered.filter(p=>p.pinned),...filtered.filter(p=>!p.pinned)];

  const css=darkMode?{"--bg":"#0f1117","--card":"#1a1d27","--border":"#2a2d3e","--text":"#e8eaf0","--text-secondary":"#b0b4c8","--text-muted":"#6b7080","--accent":"#6366f1","--accent-dim":"#6366f133","--badge-bg":"#6366f110","--btn-bg":"#1e2130","--input-bg":"#13151f","--ann-imp":"#dc262610"}:{"--bg":"#f4f5fb","--card":"#ffffff","--border":"#e2e4f0","--text":"#1a1d2e","--text-secondary":"#4a4e6a","--text-muted":"#8b90aa","--accent":"#4f46e5","--accent-dim":"#4f46e533","--badge-bg":"#4f46e510","--btn-bg":"#f0f1f8","--input-bg":"#f8f9fd","--ann-imp":"#dc262608"};

  if(!loaded)return <div style={{minHeight:"100vh",background:"#0f1117",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7080",fontFamily:"'DM Sans',sans-serif",fontSize:15}}>Loading forum...</div>;

  return(
    <div style={{...css,minHeight:"100vh",background:"var(--bg)",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:"var(--text)"}}>
      {/* ── Topbar: two rows on mobile, one row on desktop ── */}
      <div style={{background:"var(--card)",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:50}}>
        {/* Row 1: logo + action icons */}
        <div style={{padding:"0 16px",display:"flex",alignItems:"center",gap:8,height:54}}>
          <span style={{fontSize:19,fontWeight:900,letterSpacing:"-0.03em",color:"var(--accent)",whiteSpace:"nowrap"}}>🎓 ClassForum</span>
          <span style={{fontSize:10,color:"var(--text-muted)",whiteSpace:"nowrap",display:"none"}} className="desktop-subtitle">UCC Dominase · AH/MDL/25</span>
          <div style={{flex:1}}/>
          <button onClick={()=>setDarkMode(d=>!d)} style={{background:"var(--btn-bg)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:15,lineHeight:1,flexShrink:0}}>{darkMode?"☀️":"🌙"}</button>
          <NotifBell count={unreadCount} onOpen={()=>setShowNotifs(true)}/>
          <button onClick={()=>setShowProfile(true)} style={{background:"none",border:"none",cursor:"pointer",padding:2,flexShrink:0}}><Avatar name={displayName} size={32}/></button>
          <button onClick={()=>setShowNewPost(true)} style={{background:"var(--accent)",color:"#fff",border:"none",borderRadius:9,padding:"7px 14px",cursor:"pointer",fontWeight:700,fontSize:13,flexShrink:0,whiteSpace:"nowrap"}}>+ Post</button>
        </div>
        {/* Row 2: search bar (full width on mobile) */}
        <div style={{padding:"0 16px 10px"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..."
            style={{width:"100%",background:"var(--input-bg)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:8,padding:"8px 14px",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>

      <div style={{maxWidth:780,margin:"0 auto",padding:"16px 12px"}}>
        <AnnouncementsSection announcements={announcements} isAdmin={isAdmin} onAdd={addAnn} onDelete={deleteAnn}/>
        {/* Categories: horizontal scroll on mobile */}
        <div style={{overflowX:"auto",marginBottom:8,paddingBottom:4,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
          <div style={{display:"flex",gap:8,width:"max-content",paddingBottom:2}}>
            {CATEGORIES.map(c=><button key={c.id} onClick={()=>setCategory(c.id)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${category===c.id?"var(--accent)":"var(--border)"}`,background:category===c.id?"var(--accent)":"var(--btn-bg)",color:category===c.id?"#fff":"var(--text-muted)",cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{c.icon} {c.label}</button>)}
            <div style={{width:1,background:"var(--border)",margin:"0 4px",flexShrink:0}}/>
            {[["newest","🕒"],["top","▲"],["active","💬"]].map(([v,icon])=><button key={v} onClick={()=>setSortBy(v)} title={v} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${sortBy===v?"var(--accent)":"var(--border)"}`,background:sortBy===v?"var(--accent-dim)":"var(--btn-bg)",color:sortBy===v?"var(--accent)":"var(--text-muted)",cursor:"pointer",fontSize:13,fontWeight:700,flexShrink:0}}>{icon}</button>)}
          </div>
        </div>
        <div style={{display:"flex",gap:16,marginBottom:16,padding:"10px 16px",background:"var(--card)",borderRadius:10,border:"1px solid var(--border)",fontSize:12,color:"var(--text-muted)",overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",whiteSpace:"nowrap",alignItems:"center"}}>
          <span>📄 <b style={{color:"var(--text)"}}>{posts.length}</b> posts</span>
          <span>💬 <b style={{color:"var(--text)"}}>{posts.reduce((a,p)=>a+(p.replies||[]).length,0)}</b> replies</span>
          <span>▲ <b style={{color:"var(--text)"}}>{posts.reduce((a,p)=>a+(p.upvotes||[]).length,0)}</b> upvotes</span>
          <span>📌 <b style={{color:"var(--text)"}}>{announcements.length}</b> pinned</span>
          <span>👥 <b style={{color:"var(--text)"}}>93</b> students</span>
          {isAdmin&&<span style={{marginLeft:"auto",color:"var(--accent)",fontWeight:700,fontSize:12}}>{isSuperAdmin?"⭐":"⚡"} {isSuperAdmin?"Superadmin":"Admin"}</span>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {!loaded&&<div style={{textAlign:"center",padding:40,color:"var(--text-muted)"}}>Loading posts...</div>}
          {loaded&&filtered.length===0&&<div style={{textAlign:"center",padding:40,color:"var(--text-muted)"}}>No posts found. Be the first to post!</div>}
          {filtered.map(post=><PostCard key={post.id} post={post} userRegNum={regNum} isAdmin={isAdmin} identityMap={identityMap} expanded={expandedId===post.id} onToggle={()=>setExpandedId(expandedId===post.id?null:post.id)} onUpvote={upvotePost} onReply={addReply} onUpvoteReply={upvoteReply} onPin={pinPost}/>)}
        </div>
      </div>

      {showNewPost&&<NewPostModal onClose={()=>setShowNewPost(false)} onSubmit={addPost}/>}
      {showProfile&&<ProfileModal session={session} onClose={()=>setShowProfile(false)} posts={posts} adminTier={adminTier} isSuperAdmin={isSuperAdmin} grantedAdmins={grantedAdmins} onGrantAdmin={handleGrantAdmin} onRevokeAdmin={handleRevokeAdmin} onLogout={onLogout} showIdentity={showIdentity} onToggleIdentity={handleToggleIdentity}/>}
      {showNotifs&&<NotifPanel notifs={myNotifs} onClose={()=>setShowNotifs(false)} onMarkAll={markAllRead} onMarkOne={markOneRead}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [session,setSession]=useState(()=>loadSession());
  const [checking,setChecking]=useState(true);

  useEffect(()=>{
    // Verify saved session account still exists
    if(session){
      sb.from("accounts").select("reg_num").eq("reg_num",session.regNum).maybeSingle()
        .then(({data})=>{ if(!data){setSession(null);clearSession();} setChecking(false); });
    } else { setChecking(false); }
  },[]);

  const handleLogin=s=>{setSession(s);saveSession(s);};
  const handleLogout=()=>{setSession(null);clearSession();};

  if(checking)return <div style={{minHeight:"100vh",background:"#0f1117",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",color:"#6b7080",fontSize:15}}>Loading...</div>;
  return session?<ForumApp session={session} onLogout={handleLogout}/>:<AuthScreen onLogin={handleLogin}/>;
}
