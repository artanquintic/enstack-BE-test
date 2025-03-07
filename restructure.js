const sectionA = [
  {
    manager_name: 'nssi',
    login_name: 'nishanthi'
  },
  {
    manager_name: 'mbarcelona',
    login_name: 'nssi'
  },
  {
    manager_name: 'nishanthi',
    login_name: 'markcorderoi'
  },
  {
    manager_name: 'mbarcelona',
    login_name: 'richard'
  },
  {
    manager_name: 'letecia',
    login_name: 'rudy'
  }
];

function restructure(flatArray) {
  const managers = [],
    loginNames = [],
    data = {};
  for (const { manager_name, login_name } of flatArray) {
    if (manager_name in data) {
      data[manager_name].subordinate.push({ name: login_name });
    } else {
      data[manager_name] = { name: manager_name, subordinate: [{ name: login_name }] };
    }
    managers.push(manager_name);
    loginNames.push(login_name);
  }

  // Recursive function to build tree
  const buildTree = name => {
    const manager = data[name];
    if (!(manager || manager?.subordinate)) return;

    manager.subordinate = manager.subordinate.reduce((acc, item) => {
      if (item.name in data) {
        const record = buildTree(item.name);
        if (record) acc.push(record);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    return manager;
  };

  // Filter flatArray for root nodes
  const roots = [...new Set(managers.filter(x => !loginNames.includes(x)))].sort();
  const result = roots.map(name => buildTree(name));
  return result;
}
const sectionB = restructure(sectionA);
console.log(JSON.stringify(sectionB, null, 2));
