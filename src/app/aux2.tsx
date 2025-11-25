<Form className="p-3 ">
    {/* Informacion basica del inmueble */}
    <details className="details-base">
        <summary className="summary-base"> Informacion Basica </summary>
        {/* Informacion necesaria para el inmueble */}
        <fieldset className="fieldset-base grid gap-3 grid-cols-2 lg:grid-cols-3">
            <legend className="text-gray-500"> Administrativo </legend>
            <Select label="Tipo de inmueble" name="propertyType" placeholder="Tipo de inmueble..." options={Propiedades} />
            <div className="flex flex-col group">
                <label className="label-base">Gestion: </label>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="radio-base">
                        <input type="radio" name="gestion" value={0} onChange={(e) => setGestion(e.target.value)} /> <label>Arriendo</label>
                    </div>
                    <div className="radio-base">
                        <input type="radio" name="gestion" value={1} onChange={(e) => setGestion(e.target.value)} /> <label>Venta</label>
                    </div>
                    <div className="radio-base">
                        <input type="radio" name="gestion" value={2} onChange={(e) => setGestion(e.target.value)} /> <label>Arriendo / Venta</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Agente captador: </label>
                <select className="select-base" name="" id="">
                    <option value={1}>Agente Captador</option>
                </select>
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Agente promotor: </label>
                <select className="select-base" name="" id="">
                    <option value={1}>Agente Promotor</option>
                </select>
            </div>
            <Select label="Destinacion" name="destination" placeholder="Destinacion" options={["Vivienda", "Comercio"]} />
        </fieldset>
        {/* Descripcion base del inmueble */}
        <fieldset className="fieldset-base grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3">
            <legend className="text-gray-500">Descripcion Base</legend>
            <Select label="Estrato" name="stratum" placeholder="Estrato" options={[1, 2, 3, 4, 5, 6, 7]} />
            <div className="flex flex-col group">
                <label className="label-base">Año construido</label>
                <input className="input-base" type="number" name="" id="" max="2025" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Niveles</label>
                <input className="input-base" type="number" name="" id="" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Piso</label>
                <input className="input-base" type="number" name="" id="" min="0" />
            </div>
            <hr className="col-span-2 md:col-span-3 lg:col-span-4" />
            <div className="flex flex-col group">
                <label className="label-base">Habitaciones</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Baños</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Parqueaderos</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Parqueaderos cubiertos</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <hr className="col-span-2 md:col-span-3 lg:col-span-4" />
            <div className="flex flex-col group">
                <label className="label-base">Area lote M²</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Area construida M²</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
            <div className="flex flex-col group">
                <label className="label-base">Area Privada M²</label>
                <input type="number" name="" id="" className="input-base" min="0" />
            </div>
        </fieldset>
        {/* Propietario y su porcentaje */}
        <fieldset className="fieldset-base">
            <legend className="text-gray-500">Propietario</legend>
            <div className="flex gap-3 items-center">
                <div className="flex flex-col grow gap-3 lg:flex-row">
                    <input className="input-base w-full lg:w-1/2" type="text" placeholder="Buscar propietario por cedula"></input>
                    <input className="input-base w-full lg:w-1/2" type="text" placeholder="Buscar propietario por telefono"></input>
                </div>
                <button className="button-base rounded-full size-10 flex items-center justify-center" type="button"><FaSearch /></button>
                <button className="button-base rounded-full size-10 flex items-center justify-center " type="button" onClick={() => { }}><FaPlus /></button>
            </div>

        </fieldset>
        {/* Valores*/}
        <fieldset className="fieldset-base flex flex-col md:flex-row gap-3">
            <legend className="text-gray-500">Valores</legend>
            <div className="flex flex-col grow justify-center">
                {(gestion == 0 || gestion == 2) &&
                    <div className="flex flex-col group">
                        <label className="label-base">Canon </label>
                        <input name="rent" className="input-base" type="text" value={rent}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="$ Valor Canon"></input>
                    </div>
                }
                {(gestion == 1 || gestion == 2) &&
                    <div className="flex flex-col group">
                        <label className="label-base">Venta </label>
                        <input name="saleprice" className="input-base" type="text" value={saleprice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="$ Valor Venta"></input>
                    </div>
                }
            </div>
            <div className="flex flex-col grow group">
                <label className="label-base">Administracion </label>
                <input name="admin" className="input-base" type="text" value={admin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="$ Valor Administración"></input>
            </div>

        </fieldset>
    </details>
    {/* Ubicación */}
    <details className="details-base">
        <summary className="summary-base"> Ubicación del inmueble</summary>
        {/* Direccion general */}
        <fieldset className="fieldset-base">
            <legend className="text-gray-500">Dirección general</legend>
            <Select label="Pais" name="country" value={country} placeholder="Pais..." options={["Colombia"]} toggleState={(e) => setCountry(e.target.value)} />
            <Select label="Departamento" name="state" value={state} placeholder="Departamento..." options={Departamentos} toggleState={(e) => setState(e.target.value)} />
            <Select label="Ciudad" name="city" value={city} placeholder="Ciudad..." options={Ciudades.filter((c) => c.state_code == state)} toggleState={(e) => setCity(e.target.value)} />
            <Select label="Zona" name="zone" value={zone} placeholder="Zona..." options={Zonas.filter((z) => z.city_code == city)} toggleState={(e) => setZone(e.target.value)} />
            <Select label="Barrio" name="neighborhood" value={neighborhood} placeholder="Barrio..." options={Barrios.filter((b) => b.city_code == city)} toggleState={(e) => setNeighborhood(e.target.value)} />
        </fieldset>
        {/* Direccion especifica */}
        <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500">Dirección especifica</legend>
            {/* Selects para direccion */}
            <div className="flex flex-col lg:flex-row  lg:items-center gap-3 ">
                {/* Via principal */}
                <div className=" flex grow-0.5 flex-col gap-2 group justify-between border-2 border-success">
                    <label className="label-base">Via Principal</label>
                    <div className=" grid grid-cols-6">
                        <select onChange={handleDireccionChange} defaultValue="" className="select-base min-w-full" name="dir_1" id="">
                            <option value="" hidden>Tipo de via....</option>
                            {Direccion_1.map((d, idx) => (
                                <option key={idx} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                        <input onChange={handleDireccionChange} className="input-base" type="text" name="dir_2" id="" />
                        <select onChange={handleDireccionChange} className="select-base" name="dir_3" id="">
                            {Direccion_2.map((d, idx) => (
                                <option key={idx} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                        <select onChange={handleDireccionChange} className="select-base" name="dir_4" id="">
                            {Direccion_3.map((d, idx) => (
                                <option key={idx} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                        <select onChange={handleDireccionChange} className="select-base" name="dir_5" id="">
                            {Direccion_2.map((d, idx) => (
                                <option key={idx} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                        <select onChange={handleDireccionChange} className="select-base" name="dir_6" id="">
                            {Direccion_4.map((d, idx) => (
                                <option key={idx} value={d.code}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Via secundaria */}
                <div className="min-h-full flex grow-0.2 gap-2 border-2 border-success">
                    #
                    <div className="flex flex-col group">
                        <label className="label-base">Via Secundaria</label>
                        <div>
                            <input onChange={handleDireccionChange} className="input-base w-20" type="text" name="dir_7" id="" />
                            <select onChange={handleDireccionChange} className="select-base" name="dir_8" id="">
                                {Direccion_2.map((d, idx) => (
                                    <option key={idx} value={d.code}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Via complemento */}
                <div className=" grow min-h-full flex gap-2 border-2 border-success">
                    -
                    <div className="flex flex-col gap-2 group">
                        <label className="label-base">Via Complemento</label>
                        <div>
                            <input onChange={handleDireccionChange} className="input-base w-20" type="text" name="dir_9" id="" />
                            <select onChange={handleDireccionChange} className="select-base" name="dir_10" id="">
                                {Direccion_4.map((d, idx) => (
                                    <option key={idx} value={d.code}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <label className="w-full "> Direccion Final: {dirParcial}</label>
                <button type="button" onClick={handleLocation} className="button-base "> Buscar direccion</button>
            </div>
            <Map lat={coords?.lat} lon={coords?.lon} setCoords={setCoords} />
        </fieldset>
        {/* Sucursal Mantener la idea y probar*/}

    </details>
    {/* Caracteristicas */}
    <details className="details-base">
        <summary className="summary-base">Caracteristica y Amenidades</summary>

    </details>
</Form>