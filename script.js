(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const toast = (message) => {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => el.classList.remove("show"), 2400);
  };

  // Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const menu = $(".menu-toggle");
  const nav = $(".nav-links");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-links a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Mouse aura
  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
  }

  // Scroll reveal
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => revealObserver.observe(el));

  // Dynamic home page data
  const skills = [
    ["01","🛡️","Cybersecurity","Information security foundations and security-minded problem solving."],
    ["02","⚡","Ethical Hacking","Learning offensive techniques in authorized, responsible environments."],
    ["03","◈","Penetration Testing","Exploring how vulnerabilities are discovered, validated, and reported."],
    ["04","◎","Red Teaming","Studying adversary behavior, attack paths, and security assumptions."],
    ["05","⌁","Network Security","Understanding networks, protocols, traffic, and defensive controls."],
    ["06","◉","Linux & Security Tools","Building confidence with Linux and tools used in security labs."],
    ["07","⌖","Vulnerability Assessment","Finding, understanding, and prioritizing weaknesses responsibly."],
    ["08","▣","Web Application Security","Exploring common web risks and secure application concepts."],
    ["09","⌁","OSINT & Security Research","Learning structured open-source intelligence and research."],
    ["10","✦","AI & Emerging Tech","Exploring AI and emerging technologies alongside cybersecurity."]
  ];

  const projects = [
    ["01","◈","Security Lab","A growing collection of hands-on cybersecurity experiments, notes, and learning challenges.",["LABS","LINUX","SECURITY"]],
    ["02","⌁","Web Security Research","A place to document authorized web application security learning, findings, and methodology.",["WEB","OWASP","RESEARCH"]],
    ["03","◉","Network Playground","Practical networking experiments focused on protocols, visibility, hardening, and defensive thinking.",["NETWORK","LINUX","DEFENSE"]]
  ];

  const skillGrid = $("#skillsGrid");
  if (skillGrid) {
    skillGrid.innerHTML = skills.map(([num, icon, title, desc]) => `
      <article class="skill-card reveal">
        <div class="skill-num">${num}</div>
        <div class="skill-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
      </article>
    `).join("");
    $$(".skill-card", skillGrid).forEach(el => revealObserver.observe(el));
  }

  const projectGrid = $("#projectGrid");
  if (projectGrid) {
    projectGrid.innerHTML = projects.map(([num, icon, title, desc, tags]) => `
      <article class="project-card reveal">
        <div class="project-top"><span class="project-num">${num}</span><span>BUILDING</span></div>
        <div class="project-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="tag-row">${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      </article>
    `).join("");
    $$(".project-card", projectGrid).forEach(el => revealObserver.observe(el));
  }

  // Subtle card tilt
  $$(".tilt-card").forEach(card => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * -8 - 5}deg) rotateX(${y * -4 + 2}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  // Shared click feedback for demo buttons
  $$(".button").forEach(button => {
    button.addEventListener("click", () => {
      if (button.getAttribute("href")?.startsWith("#")) {
        toast(`Opening ${button.textContent.trim().replace(/\s+/g, " ")}`);
      }
    });
  });

  // RED MAP page
  if (document.body.dataset.page === "redmap") {
    const data = {
      recon: {
        index: "01", category: "RECON / OSINT", title: "Reconnaissance",
        description: "Start by understanding the target surface in an authorized environment: public information, domains, technologies, and exposed assumptions.",
        tags: ["OSINT", "DISCOVERY", "SCOPE"]
      },
      enum: {
        index: "02", category: "ENUM / DISCOVERY", title: "Enumeration",
        description: "Turn broad discovery into structured knowledge: services, versions, routes, assets, interfaces, and trust boundaries.",
        tags: ["ASSETS", "SERVICES", "ENUM"]
      },
      network: {
        index: "03", category: "NETWORK / TRAFFIC", title: "Network Security",
        description: "Study how hosts communicate, where traffic flows, what is visible, and which defensive controls can reduce exposure.",
        tags: ["TCP/IP", "VISIBILITY", "HARDENING"]
      },
      web: {
        index: "04", category: "WEB / APPLICATION", title: "Web Application Security",
        description: "Explore application behavior, validation, sessions, APIs, and common web security risks inside controlled environments.",
        tags: ["HTTP", "API", "OWASP"]
      },
      auth: {
        index: "05", category: "IDENTITY / ACCESS", title: "Authentication & Identity",
        description: "Understand how identities are verified, sessions are managed, and authorization boundaries should be protected.",
        tags: ["AUTH", "SESSIONS", "ACCESS"]
      },
      linux: {
        index: "06", category: "HOST / LINUX", title: "Linux Security",
        description: "Build practical knowledge of Linux processes, permissions, logs, services, shells, and host-level defensive practices.",
        tags: ["LINUX", "SHELL", "HOST"]
      },
      defense: {
        index: "07", category: "DEFENSE / HARDENING", title: "Defense & Hardening",
        description: "Translate findings into protection: reduce attack surface, strengthen configurations, improve visibility, and close gaps.",
        tags: ["DEFENSE", "LOGGING", "HARDEN"]
      },
      report: {
        index: "08", category: "REPORT / FINDINGS", title: "Responsible Reporting",
        description: "Document observations clearly, explain impact, preserve evidence, and communicate remediation steps responsibly.",
        tags: ["FINDINGS", "IMPACT", "REMEDIATION"]
      }
    };

    const panel = $("#nodePanel");
    const nodeIndex = $("#nodeIndex");
    const nodeCategory = $("#nodeCategory");
    const nodeTitle = $("#nodeTitle");
    const nodeDescription = $("#nodeDescription");
    const nodeTags = $("#nodeTags");
    const nodeClose = $("#nodeClose");
    const nodes = $$(".map-node");
    const filters = $$(".filter-button");
    const reset = $("#resetMap");
    const typed = $("#typedCommand");

    const selectNode = (key) => {
      const item = data[key];
      if (!item) return;
      nodes.forEach(node => node.classList.toggle("is-active", node.dataset.node === key));
      nodeIndex.textContent = item.index;
      nodeCategory.textContent = item.category;
      nodeTitle.textContent = item.title;
      nodeDescription.textContent = item.description;
      nodeTags.innerHTML = item.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
      panel.classList.add("node-panel-active");
      if (typed) typed.textContent = `focus --node ${key}`;
      toast(`Node ${item.index}: ${item.title}`);
    };

    nodes.forEach(node => node.addEventListener("click", () => selectNode(node.dataset.node)));
    nodeClose?.addEventListener("click", () => panel.classList.remove("node-panel-active"));

    filters.forEach(button => {
      button.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        nodes.forEach(node => {
          node.classList.toggle("dimmed", filter !== "all" && node.dataset.category !== filter);
        });
        toast(filter === "all" ? "Showing all learning nodes" : `Filtering: ${filter.toUpperCase()}`);
      });
    });

    reset?.addEventListener("click", () => {
      filters.forEach(b => b.classList.toggle("active", b.dataset.filter === "all"));
      nodes.forEach(node => node.classList.remove("dimmed"));
      selectNode("recon");
      panel.classList.remove("node-panel-active");
      toast("Red Map reset");
    });

    selectNode("recon");
    panel.classList.remove("node-panel-active");
  }
})();