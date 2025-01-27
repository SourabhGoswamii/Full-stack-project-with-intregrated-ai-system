import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios'

function Home() {
  const { user } = useContext(UserContext);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  function createProject(e) {
    e.preventDefault();
    axios.post("/project/create", { name: projectName }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <main>
        <button
          onClick={() => setIsModelOpen(true)}
          className="border-2 border-blue-500 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 m-5 px-4 py-2"
        >
          Create Project
        </button>
        {isModelOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">Create Project</h2>
              <form onSubmit={createProject}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="projectName"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    id="projectName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsModelOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
